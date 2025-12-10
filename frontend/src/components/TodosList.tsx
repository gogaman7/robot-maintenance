import { useState } from 'react';
import type { Todo, Category } from './TodoAppCard';

interface TodosListProps {
  todos: Todo[];
  categories: Category[];
  onDeleteTodo: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onUpdateTodo: (todo: Todo) => void;
}

export default function TodosList({ 
  todos,
  categories,
  onDeleteTodo, 
  onToggleComplete,
  onUpdateTodo 
}: TodosListProps) {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editCategoryId, setEditCategoryId] = useState<number>(2);

  const formatDate = (dateString: string) => {
    // Need to handle partial dates (YYYY-MM-DD) to prevent timezone shifts when converting to Date
    // Creating a date object from YYYY-MM-DD string treats it as UTC, and displaying it might shift day.
    // To be safe and consistent with the input type="date", we can just split it.
    // However, the original code used new Date(dateString) which might have had timezone issues.
    // Let's stick to simple formatting.
    const parts = dateString.split('-');
    if (parts.length === 3) {
        const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return dateString;
  };

  const startEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditDueDate(todo.dueDate);
    setEditCategoryId(todo.categoryId);
  };

  const saveEdit = () => {
    if (!editingTodo || !editTitle.trim()) {
        if (!editTitle.trim()) alert('Please enter a title');
        return;
    }

    const updatedTodo: Todo = {
        ...editingTodo,
        title: editTitle.trim(),
        description: editDescription.trim(),
        dueDate: editDueDate,
        categoryId: editCategoryId
    };

    onUpdateTodo(updatedTodo);
    setEditingTodo(null);
  };

  if (todos.length === 0) {
    return (
      <ul className="todo-list" id="todoList">
          <div className="empty-state">
              <h3>No todos yet</h3>
              <p>Add your first todo above!</p>
          </div>
      </ul>
    );
  }

  return (
    <>
      <ul className="todo-list" id="todoList">
        {todos.map(todo => {
            const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
            return (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <div className="todo-header">
                        <div className="todo-title-section">
                            <input 
                                type="checkbox" 
                                className="todo-checkbox" 
                                checked={todo.completed} 
                                onChange={() => onToggleComplete(todo.id)}
                            />
                            <h3 className="todo-title">{todo.title}</h3>
                        </div>
                        <div className="todo-actions">
                            <button className="btn btn-secondary" onClick={() => startEdit(todo)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => onDeleteTodo(todo.id)}>Delete</button>
                        </div>
                    </div>
                    <p className="todo-description">{todo.description}</p>
                    <div className="todo-meta">
                        <span>📅 Created: {formatDate(todo.createdDate)}</span>
                        {todo.dueDate && (
                            <span className={isOverdue ? 'overdue' : ''}>
                                ⏰ Due: {formatDate(todo.dueDate)}
                                {isOverdue ? '(Overdue!)' : ''}
                            </span>
                        )}
                    </div>
                </li>
            );
        })}
      </ul>

      {/* Edit Todo Modal */}
      <div className={`modal ${editingTodo ? 'active' : ''}`} onClick={(e) => {
          if (e.target === e.currentTarget) setEditingTodo(null);
      }}>
        <div className="modal-content">
            <h2 className="modal-header">Edit Todo</h2>
            <div className="form-group">
                <label>Title</label>
                <input 
                    type="text" 
                    id="editTodoTitle"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea 
                    id="editTodoDescription"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select
                    id="editTodoCategory"
                    value={editCategoryId}
                    onChange={(e) => setEditCategoryId(Number(e.target.value))}
                >
                    {categories.filter(c => c.id !== 1).map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Due Date</label>
                <input 
                    type="date" 
                    id="editTodoDueDate"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                />
            </div>
            <div className="form-actions">
                <button className="btn btn-primary" onClick={saveEdit}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditingTodo(null)}>Cancel</button>
            </div>
        </div>
      </div>
    </>
  );
}

