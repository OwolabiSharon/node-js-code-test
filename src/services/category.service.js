/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const CategorytModel = require('../models/category.model');

const fetchCategoryById = async (data) => {
  const category = await CategorytModel.findById(data);

  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'operation failed');
  }

  return category;
};

const createCategory = async (data) => {
  const interest = await CategorytModel.create(data);
  if (!interest) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'operation failed');
  }

  return interest;
};

const fetchCategories = async () => {
  const categories = await CategorytModel.find();

  return categories;
};

module.exports = {
  createCategory,
  fetchCategories,
  fetchCategoryById,
};
