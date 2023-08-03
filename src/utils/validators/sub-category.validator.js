import { param, body } from 'express-validator';
import validatorMiddleware from '../../middlewares/validator.middleware.js';

export const mongoIdValidator = [
  param('id').isMongoId().withMessage('Invalid SubCategory ID format'),
  validatorMiddleware,
];

export const createSubCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('SubCategory name is Required')
    .isLength({ min: 3 })
    .withMessage('SubCategory name is too short')
    .isLength({ max: 32 })
    .withMessage('SubCategory name is too long'),
  body('category').isMongoId().withMessage('Invalid Category ID format'),
  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  [
    param('id').isMongoId().withMessage('Invalid SubCategory ID format'),
    body('name')
      .notEmpty()
      .withMessage('SubCategory name is Required')
      .isLength({ min: 1 })
      .withMessage('SubCategory name is too short')
      .isLength({ max: 32 })
      .withMessage('SubCategory name is too long'),
  ],
  validatorMiddleware,
];
