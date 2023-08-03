import express from 'express';
import {
  createProductValidator,
  deleteProductValidator,
  getProductByIdValidator,
  updateProductValidator,
} from '../utils/validators/product.validator.js';
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from '../services/product.service.js';

const productRouter = express.Router();

productRouter
  .route('/')
  .get(getProducts)
  .post(createProductValidator, createProduct);

productRouter
  .route('/:id')
  .get(getProductByIdValidator, getProductById)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProductById);

export default productRouter;
