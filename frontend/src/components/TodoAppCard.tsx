import { useState } from 'react';
import Header from './Header';
import TodoAppDetail from './TodoAppDetail';

export interface Category {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  dueDate: string;
  createdDate: string;
  completed: boolean;
}

export default function TodoAppCard() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'All' },
    { id: 2, name: 'Project management' },
    { id: 3, name: 'Hardware' },
    { id: 4, name: 'Firmware' },
    { id: 5, name: 'Control portal' }
  ]);

  const [todos, setTodos] = useState<Todo[]>([
    {
        id: 1,
        categoryId: 2,
        title: 'Complete coding assesment',
        description: 'Frontend and backend',
        dueDate: '2025-12-10',
        createdDate: '2025-12-09',
        completed: false
    },
    {
        id: 2,
        categoryId: 2,
        title: 'Frontend scheleton',
        description: 'Frontend UI',
        dueDate: '2025-12-10',
        createdDate: '2025-12-09',
        completed: true
    },
    {
        id: 3,
        categoryId: 2,
        title: 'Backend APIs',
        description: 'Backend APIs for all CRUD',
        dueDate: '2025-12-10',
        createdDate: '2025-12-09',
        completed: false
    },
    {
        id: 3,
        categoryId: 2,
        title: 'Frontend interacting with backend',
        description: 'Frontend calling backend at /api',
        dueDate: '2025-12-10',
        createdDate: '2025-12-09',
        completed: false
    }
  ]);

  const [currentCategoryId, setCurrentCategoryId] = useState<number>(1);

  return (
    <div className="container">
      <Header />
      <TodoAppDetail 
        categories={categories} 
        setCategories={setCategories}
        todos={todos} 
        setTodos={setTodos}
        currentCategoryId={currentCategoryId}
        setCurrentCategoryId={setCurrentCategoryId}
      />
    </div>
  );
}

