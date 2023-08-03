import express from 'express';
import {
  createSubCategory,
  deleteSubCategoryById,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from '../services/sub-category.service.js';
import {
  createSubCategoryValidator,
  mongoIdValidator,
  updateSubCategoryValidator,
} from '../utils/validators/sub-category.validator.js';

const subCategoryRouter = express.Router();

subCategoryRouter
  .route('/')
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);
subCategoryRouter
  .route('/:id')
  .get(mongoIdValidator, getSubCategoryById)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(mongoIdValidator, deleteSubCategoryById);
export default subCategoryRouter;
