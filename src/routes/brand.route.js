import express from 'express';
import {
  createBrand,
  deleteBrandById,
  getBrandById,
  getBrands,
  updateBrandById,
} from '../services/brand.service.js';
import {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} from '../utils/validators/brand.validator.js';

const brandRouter = express.Router();

brandRouter.route('/').get(getBrands).post(createBrandValidator, createBrand);
brandRouter
  .route('/:id')
  .get(getBrandValidator, getBrandById)
  .put(updateBrandValidator, updateBrandById)
  .delete(deleteBrandValidator, deleteBrandById);

export default brandRouter;
