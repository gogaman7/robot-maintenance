import React, { useState } from 'react';
import type { Todo, Category } from './TodoAppCard';
import TodosTop from './TodosTop';
import TodoEdit from './TodoEdit';
import TodosList from './TodosList';
import { api, type ApiError } from '../services/api';

interface TodosSectionProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  categories: Category[];
  currentCategoryId: number;
}

export default function TodosSection({
  todos,
  setTodos,
  categories,
  currentCategoryId
}: TodosSectionProps) {
  const [sortType, setSortType] = useState<string>('created-desc');
  const [error, setError] = useState<string | null>(null);

  const currentCategoryName = categories.find(c => c.id === currentCategoryId)?.name || 'All';
  const displayTitle = currentCategoryName === 'All' ? 'All Todos' : currentCategoryName;

  const filteredTodos = currentCategoryId === 1
    ? todos
    : todos.filter(t => t.categoryId === currentCategoryId);

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortType) {
        case 'created-desc':
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'created-asc':
            return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        case 'due-asc':
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'due-desc':
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        default:
            return 0;
    }
  });

  const handleAddTodo = async (newTodo: Todo) => {
    try {
      setError(null);
      const createdTodo = await api.createTodo({
        title: newTodo.title,
        description: newTodo.description,
        dueDate: newTodo.dueDate,
        categoryId: newTodo.categoryId
      });
      setTodos([...todos, createdTodo]);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error || 'Failed to create todo');
      alert(`Error: ${apiError.error || 'Failed to create todo'}`);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      setError(null);
      await api.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error || 'Failed to delete todo');
      alert(`Error: ${apiError.error || 'Failed to delete todo'}`);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      setError(null);
      const updatedTodo = await api.updateTodo(id, { 
        completed: !todo.completed,
        categoryId: todo.categoryId,
        createdDate: todo.createdDate
      });
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error || 'Failed to update todo');
      alert(`Error: ${apiError.error || 'Failed to update todo'}`);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      setError(null);
      const result = await api.updateTodo(updatedTodo.id, {
        title: updatedTodo.title,
        description: updatedTodo.description,
        dueDate: updatedTodo.dueDate,
        completed: updatedTodo.completed,
        categoryId: updatedTodo.categoryId,
        createdDate: updatedTodo.createdDate
      });
      setTodos(todos.map(t => t.id === result.id ? result : t));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error || 'Failed to update todo');
      alert(`Error: ${apiError.error || 'Failed to update todo'}`);
    }
  };

  return (
    <main className="todos-section">
      {error && (
        <div style={{ 
          padding: '0.75rem', 
          marginBottom: '1rem', 
          background: '#ffe5e5', 
          color: '#dc3545',
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}
      <TodosTop 
        title={displayTitle} 
        sortType={sortType} 
        setSortType={setSortType} 
      />
      <TodoEdit 
        onAddTodo={handleAddTodo}
        currentCategoryId={currentCategoryId}
        categories={categories}
      />
      <TodosList 
        todos={sortedTodos}
        categories={categories}
        onDeleteTodo={handleDeleteTodo}
        onToggleComplete={handleToggleComplete}
        onUpdateTodo={handleUpdateTodo}
      />
    </main>
  );
}

