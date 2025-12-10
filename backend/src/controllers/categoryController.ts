import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categories, getNextCategoryId } from '../data';

export const getCategories = (req: Request, res: Response) => {
  res.json(categories);
};

export const createCategory = (req: Request, res: Response) => {
  const { name } = req.body;
  const category = {
    id: getNextCategoryId(),
    name
  };
  categories.push(category);
  res.json(category);
};

export const updateCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = categories.find(c => c.id === Number(id));
  
  if (!category) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Category not found' });
  }
  
  category.name = name;
  res.json(category);
};

export const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = categories.findIndex(c => c.id === Number(id));
  
  if (index === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Category not found' });
  }
  
  categories.splice(index, 1);
  res.status(StatusCodes.NO_CONTENT).send();
};
