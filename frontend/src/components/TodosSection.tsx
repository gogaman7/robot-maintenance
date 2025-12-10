import React, { useState } from 'react';
import type { Todo, Category } from './TodoAppCard';
import TodosTop from './TodosTop';
import TodoEdit from './TodoEdit';
import TodosList from './TodosList';

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

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id: number) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
  };

  return (
    <main className="todos-section">
      <TodosTop 
        title={displayTitle} 
        sortType={sortType} 
        setSortType={setSortType} 
      />
      <TodoEdit 
        onAddTodo={handleAddTodo}
        currentCategoryId={currentCategoryId}
      />
      <TodosList 
        todos={sortedTodos}
        onDeleteTodo={handleDeleteTodo}
        onToggleComplete={handleToggleComplete}
        onUpdateTodo={handleUpdateTodo}
      />
    </main>
  );
}

