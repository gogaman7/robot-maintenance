import { useState, useEffect } from 'react';
import type { Todo, Category } from './TodoAppCard';

interface TodoEditProps {
  onAddTodo: (todo: Todo) => void;
  currentCategoryId: number;
  categories: Category[];
}

export default function TodoEdit({ onAddTodo, currentCategoryId, categories }: TodoEditProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
    currentCategoryId === 1 ? 2 : currentCategoryId
  );

  // Update selected category when currentCategoryId changes (unless "All" is selected)
  useEffect(() => {
    if (currentCategoryId !== 1) {
      setSelectedCategoryId(currentCategoryId);
    }
  }, [currentCategoryId]);

  const handleAdd = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      categoryId: selectedCategoryId,
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
        <label>Category</label>
        <select
          id="todoCategory"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
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

