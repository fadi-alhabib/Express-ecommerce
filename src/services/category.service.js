import slugify from 'slugify';
import asyncHandler from 'express-async-handler';
import categoryModel from '../models/category.model.js';

import CustomError from '../utils/custom-error.js';

// @desc Get List of Categories
// @route GET /api/v1/categories
// @access Public
export const getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const categoriesList = await categoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ result: categoriesList.length, page, data: categoriesList });
});

// @desc Get a Single Category by ID
// @route GET /api/v1/categories/:id
// @access Public
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    // res.status(404).json({ message: `No Category has this ID ${id}` });
    return next(new CustomError(`No Category has this ID ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Creates a Category
// @rout POST /api/v1/categories
// @access Private
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc Updates a Single Category by passing it's ID
// @rout PUT /api/v1/categories/:id
// @access Private
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new CustomError(`No Category has this ID ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Delete a Single Category by passing it's ID
// @rout DELETE /api/v1/categories/:id
// @access Private
export const deleteCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new CustomError(`No Category has this ID ${id}`, 404));
  }
  res.status(204).send();
});
