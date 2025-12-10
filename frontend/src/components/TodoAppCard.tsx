import { useState, useEffect } from 'react';
import Header from './Header';
import TodoAppDetail from './TodoAppDetail';
import { api, type ApiError } from '../services/api';

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
    { id: 1, name: 'All' }
  ]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from API on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [categoriesData, todosData] = await Promise.all([
        api.getCategories(),
        api.getTodos()
      ]);
      
      // Always ensure "All" category exists at the beginning
      const allCategory = { id: 1, name: 'All' };
      const otherCategories = categoriesData.filter(c => c.id !== 1);
      setCategories([allCategory, ...otherCategories]);
      
      setTodos(todosData);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error || 'Failed to load data from server');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Loading data from server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center', color: '#dc3545' }}>
          <h3>Error</h3>
          <p>{error}</p>
          <button 
            onClick={loadData}
            style={{ 
              marginTop: '1rem', 
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

