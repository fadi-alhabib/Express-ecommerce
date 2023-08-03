import slugify from 'slugify';
import asyncHandler from 'express-async-handler';
import subCategoryModel from '../models/sub-category.model.js';
import CustomError from '../utils/custom-error.js';
// @desc Creates a Category
// @rout POST /api/v1/subcategories
// @access Private
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
// @desc Get List of SubCategories
// @route GET /api/v1/subcategories
// @access Public
export const getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const subCategoriesList = await subCategoryModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: ['name', 'slug'] });
  res
    .status(200)
    .json({ result: subCategoriesList.length, page, data: subCategoriesList });
});
// @desc Get a Single Category by ID
// @route GET /api/v1/subcategories/:id
// @access Public
export const getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel
    .findById(id)
    .populate({ path: 'category', select: ['name', 'slug'] });
  if (!subCategory) {
    return next(new CustomError(`No SubCategory has this ID ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Updates a Single Category by passing it's ID
// @rout PUT /api/v1/subcategories/:id
// @access Private
export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await subCategoryModel
    .findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name), category },
      { new: true }
    )
    .populate({ path: 'category', select: ['name', 'slug'] });
  if (!subCategory) {
    return next(new CustomError(`No SubCategory has this ID ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc Delete a Single SubCategory by passing it's ID
// @rout DELETE /api/v1/subcategories/:id
// @access Private
export const deleteSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findByIdAndDelete(id);

  if (!subCategory) {
    return next(new CustomError(`No Category has this ID ${id}`, 404));
  }
  res.status(204).send();
});
