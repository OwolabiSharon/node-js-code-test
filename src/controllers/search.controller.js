/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { searchService } = require('../services');

const search = catchAsync(async (req, res) => {
  const { userId } = req.userData;
  const { type, input } = req.query;
  const resp = await searchService.search(userId,type, input);

  res.status(httpStatus.CREATED).send({ message: 'fetched successfully', data: resp, status: true });
});

const getSearchHistory = catchAsync(async (req, res) => {
  const { userId } = req.userData;

  const resp = await searchService.getSearchHistory(userId);

  res.status(httpStatus.CREATED).send({ message: 'fetched successfully', data: resp, status: true });
});

module.exports = {
  search,
  getSearchHistory
};
