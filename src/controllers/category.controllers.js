/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send({ message: 'interest added successfully', status: true });
});

const fetchCategories = catchAsync(async (_, res) => {
  const categories = await categoryService.fetchCategories();
  res.status(httpStatus.CREATED).send({ message: 'categories fetched successfully', data: categories, status: true });
});

module.exports = {
  createCategory,
  fetchCategories,
};
