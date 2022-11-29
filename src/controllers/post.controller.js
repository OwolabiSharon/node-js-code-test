/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  const { _id } = req.userData;

  const created = await postService.createPost({ ...req.body, userId: _id });
  res.status(httpStatus.CREATED).send({ message: 'Created successfully', data: created, status: true });
});

const fetchPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['startDate', 'endDate', 'categoryId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const data = await postService.fetchPosts(filter, options);
  res.status(httpStatus.CREATED).send({ message: 'fetched successfully', data, status: true });
});

module.exports = {
  createPost,
  fetchPosts,
};
