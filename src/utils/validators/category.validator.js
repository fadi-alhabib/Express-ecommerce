import { param, body } from 'express-validator';
import validatorMiddleware from '../../middlewares/validator.middleware.js';

export const mongoIdValidator = [
  param('id').isMongoId().withMessage('Invalid Category ID format'),
  validatorMiddleware,
];

export const createCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Category name is Required')
    .isLength({ min: 3 })
    .withMessage('Category name is too short')
    .isLength({ max: 32 })
    .withMessage('Category name is too long'),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  [
    param('id').isMongoId().withMessage('Invalid Category ID format'),
    body('name')
      .notEmpty()
      .withMessage('Category name is Required')
      .isLength({ min: 3 })
      .withMessage('Category name is too short')
      .isLength({ max: 32 })
      .withMessage('Category name is too long'),
  ],
  validatorMiddleware,
];
