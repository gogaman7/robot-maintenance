import React from 'react';
import CategoriesSection from './CategoriesSection';
import TodosSection from './TodosSection';
import type { Category, Todo } from './TodoAppCard';

interface TodoAppDetailProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  currentCategoryId: number;
  setCurrentCategoryId: React.Dispatch<React.SetStateAction<number>>;
}

export default function TodoAppDetail({
  categories,
  setCategories,
  todos,
  setTodos,
  currentCategoryId,
  setCurrentCategoryId
}: TodoAppDetailProps) {
  return (
    <div className="main-content">
      <CategoriesSection 
        categories={categories} 
        setCategories={setCategories}
        currentCategoryId={currentCategoryId}
        setCurrentCategoryId={setCurrentCategoryId}
        todos={todos}
        setTodos={setTodos}
      />
      <TodosSection 
        todos={todos} 
        setTodos={setTodos}
        categories={categories}
        currentCategoryId={currentCategoryId}
      />
    </div>
  );
}

