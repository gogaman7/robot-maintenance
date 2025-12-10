import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { todos, getNextTodoId, categories } from '../data';

export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

export const createTodo = (req: Request, res: Response) => {
  const { title, description, dueDate, categoryId } = req.body;
  
  // Validate that categoryId exists
  const categoryExists = categories.some(c => c.id === Number(categoryId));
  if (!categoryExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid categoryId: category does not exist' });
  }
  
  const createdDate = new Date().toISOString();
  const todo = {
    id: getNextTodoId(),
    title,
    description,
    dueDate: dueDate || null,
    createdDate,
    categoryId: Number(categoryId),
    completed: false
  };
  todos.push(todo);
  res.json(todo);
};

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, completed, categoryId, createdDate } = req.body;
  const todo = todos.find(t => t.id === Number(id));
  
  if (!todo) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Todo not found' });
  }

  // Check if createdDate is being changed or does not match
  if (createdDate !== undefined && createdDate !== todo.createdDate) {
    return res.status(StatusCodes.CONFLICT).json({ error: 'Stale object: createdDate does not match' });
  }

  // Check if categoryId is being changed and does not match
  if (categoryId !== undefined && Number(categoryId) !== todo.categoryId) {
    return res.status(StatusCodes.CONFLICT).json({ error: 'Stale object: categoryId does not match' });
  }
  
  // Validate that categoryId exists if it's being provided
  if (categoryId !== undefined) {
    const categoryExists = categories.some(c => c.id === Number(categoryId));
    if (!categoryExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid categoryId: category does not exist' });
    }
  }
  
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (dueDate !== undefined) todo.dueDate = dueDate;
  if (completed !== undefined) todo.completed = completed;
  
  res.json(todo);
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === Number(id));
  
  if (index === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Todo not found' });
  }
  
  todos.splice(index, 1);
  res.status(StatusCodes.NO_CONTENT).send();
};
