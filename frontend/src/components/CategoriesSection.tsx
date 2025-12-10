import React, { useState } from 'react';
import type { Category, Todo } from './TodoAppCard';
import { api, type ApiError } from '../services/api';

interface CategoriesSectionProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  currentCategoryId: number;
  setCurrentCategoryId: React.Dispatch<React.SetStateAction<number>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function CategoriesSection({
  categories,
  setCategories,
  currentCategoryId,
  setCurrentCategoryId,
  todos,
  setTodos
}: CategoriesSectionProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      setError(null);
      const newCategory = await api.createCategory(newCategoryName.trim());
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error || 'Failed to create category');
      alert(`Error: ${apiError.error || 'Failed to create category'}`);
    }
  };

  const deleteCategory = async (id: number) => {
    if (id === 1) return; // Cannot delete 'All'
    if (!confirm('Are you sure you want to delete this category? All todos in this category will remain but be uncategorized.')) return;

    try {
      setError(null);
      
      // Update todos in this category to 'All' (id 1) before deleting
      const todosToUpdate = todos.filter(todo => todo.categoryId === id);
      await Promise.all(
        todosToUpdate.map(todo => 
          api.updateTodo(todo.id, { 
            ...todo,
            categoryId: 1 
          })
        )
      );

      // Update local state
      const updatedTodos = todos.map(todo => 
        todo.categoryId === id ? { ...todo, categoryId: 1 } : todo
      );
      setTodos(updatedTodos);

      // Delete the category
      await api.deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));

      if (currentCategoryId === id) {
        setCurrentCategoryId(1);
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error || 'Failed to delete category');
      alert(`Error: ${apiError.error || 'Failed to delete category'}`);
    }
  };

  const startEditCategory = (category: Category) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
  };

  const saveEditCategory = async () => {
    if (!editingCategory || !editCategoryName.trim()) return;
    
    try {
      setError(null);
      const updatedCategory = await api.updateCategory(editingCategory.id, editCategoryName.trim());
      setCategories(categories.map(c => 
        c.id === updatedCategory.id ? updatedCategory : c
      ));
      setEditingCategory(null);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error || 'Failed to update category');
      alert(`Error: ${apiError.error || 'Failed to update category'}`);
    }
  };

  return (
    <aside className="sidebar">
      <h2>Categories</h2>
      {error && (
        <div style={{ 
          padding: '0.5rem', 
          marginBottom: '1rem', 
          background: '#ffe5e5', 
          color: '#dc3545',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}
      <ul className="category-list" id="categoryList">
        {categories.map(cat => (
          <li 
            key={cat.id} 
            className={`category-item ${cat.id === currentCategoryId ? 'active' : ''}`}
            onClick={() => setCurrentCategoryId(cat.id)}
          >
            <span className="category-name">{cat.name}</span>
            {cat.id !== 1 && (
              <div className="category-actions">
                <button 
                  onClick={(e) => { e.stopPropagation(); startEditCategory(cat); }} 
                  title="Edit"
                >
                  ✏️
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }} 
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="add-category">
        <input 
          type="text" 
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category..." 
          onKeyDown={(e) => e.key === 'Enter' && addCategory()}
        />
        <button onClick={addCategory}>+</button>
      </div>

      {/* Edit Category Modal */}
      <div className={`modal ${editingCategory ? 'active' : ''}`} onClick={(e) => {
          if (e.target === e.currentTarget) setEditingCategory(null);
      }}>
        <div className="modal-content">
            <h2 className="modal-header">Edit Category</h2>
            <div className="form-group">
                <label>Category Name</label>
                <input 
                  type="text" 
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                />
            </div>
            <div className="form-actions">
                <button className="btn btn-primary" onClick={saveEditCategory}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditingCategory(null)}>Cancel</button>
            </div>
        </div>
      </div>
    </aside>
  );
}

test