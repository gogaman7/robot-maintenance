import { useState } from 'react';
import type { Todo } from './TodoAppCard';

interface TodoEditProps {
  onAddTodo: (todo: Todo) => void;
  currentCategoryId: number;
}

export default function TodoEdit({ onAddTodo, currentCategoryId }: TodoEditProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      categoryId: currentCategoryId === 1 ? 2 : currentCategoryId, // Default to Work (2) if All (1) is selected
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate,
      createdDate: new Date().toISOString().split('T')[0],
      completed: false
    };

    onAddTodo(newTodo);
    
    // Clear form
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="add-todo-form">
      <div className="form-group">
        <label>Title</label>
        <input 
          type="text" 
          id="todoTitle" 
          placeholder="Enter todo title..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea 
          id="todoDescription" 
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Due Date</label>
        <input 
          type="date" 
          id="todoDueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" onClick={handleAdd}>Add Todo</button>
      </div>
    </div>
  );
}

