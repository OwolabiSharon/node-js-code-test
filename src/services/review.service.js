const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const ReviewModel = require('../models/review.model');

const addReview = async (data) => {
  const review = await ReviewModel.create(data);

  if (!review) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'operation failed');
  }

  return review;
};

const fetchReviews = async (filter, paginationOptions) => {
  const Reviews = await ReviewModel.paginate(filter, { ...paginationOptions, populate: 'userId postId' });

  return Reviews;
};

module.exports = {
  addReview,
  fetchReviews,
};
