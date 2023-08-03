import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import brandModel from '../models/brand.model.js';
import CustomError from '../utils/custom-error.js';

// @desc Get List of Brands
// @route GET /api/v1/brands
// @access Public
export const getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const brandsList = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: brandsList.length, page, data: brandsList });
});

// @desc Get a Single Brand by ID
// @route GET /api/v1/brands/:id
// @access Public
export const getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new CustomError(`No Brand has this ID ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Creates a Brand
// @rout POST /api/v1/brands
// @access Private
export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc Updates a Single Brand by passing it's ID
// @rout PUT /api/v1/brands/:id
// @access Private
export const updateBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new CustomError(`No Brand has this ID ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Delete a Single Brand by passing it's ID
// @rout DELETE /api/v1/brands/:id
// @access Private
export const deleteBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);

  if (!brand) {
    return next(new CustomError(`No Brand has this ID ${id}`, 404));
  }
  res.status(204).send();
});
