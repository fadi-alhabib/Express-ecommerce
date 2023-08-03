import slugify from 'slugify';
import asyncHandler from 'express-async-handler';
import productModel from '../models/product.model.js';
import CustomError from '../utils/custom-error.js';

// @desc Get List of Products
// @route GET /api/v1/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const productsList = await productModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name' });
  res
    .status(200)
    .json({ result: productsList.length, page, data: productsList });
});

// @desc Get a Single Product by ID
// @route GET /api/v1/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate({ path: 'category', select: 'name' });
  if (!product) {
    return next(new CustomError(`No Product has this ID ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Creates a Product
// @rout POST /api/v1/products
// @access Private
export const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// @desc Updates a Single Product by passing it's ID
// @rout PUT /api/v1/products/:id
// @access Private
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);
  const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new CustomError(`No Product has this ID ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Delete a Single Product by passing it's ID
// @rout DELETE /api/v1/products/:id
// @access Private
export const deleteProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);

  if (!product) {
    return next(new CustomError(`No Product has this ID ${id}`, 404));
  }
  res.status(204).send();
});
