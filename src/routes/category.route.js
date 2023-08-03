import { Router } from 'express';

import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} from '../services/category.service.js';
import {
  createCategoryValidator,
  mongoIdValidator,
  updateCategoryValidator,
} from '../utils/validators/category.validator.js';

const categoryRouter = Router();

categoryRouter
  .route('/')
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
categoryRouter
  .route('/:id')
  .get(mongoIdValidator, getCategoryById)
  .put(updateCategoryValidator, updateCategory)
  .delete(mongoIdValidator, deleteCategoryById);

export default categoryRouter;
