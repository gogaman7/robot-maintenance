export interface Category {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string | null;
  createdDate: string;
  completed: boolean;
  categoryId: number;
}

export const categories: Category[] = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Project management' },
  { id: 3, name: 'Hardware' },
  { id: 4, name: 'Firmware' },
  { id: 5, name: 'Control portal' }
];

export const todos: Todo[] = [
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
    completed: true
  },
  {
    id: 4,
    categoryId: 2,
    title: 'Frontend interacting with backend',
    description: 'Frontend calling backend at /api',
    dueDate: '2025-12-10',
    createdDate: '2025-12-09',
    completed: false
  }
];

let nextCategoryId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
let nextTodoId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

export const getNextCategoryId = () => nextCategoryId++;
export const getNextTodoId = () => nextTodoId++;

