const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addReview = {
  body: Joi.object().keys({
    postId: Joi.required().custom(objectId),
    review: Joi.string().required(),
    rating: Joi.number().required(),
  }),
};

const fetchReviews = {
  query: Joi.object().keys({
    userId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.string(),
    page: Joi.string(),
    postId: Joi.custom(objectId),
    startDate: Joi.string(),
    endDate: Joi.string(),
  }),
};

module.exports = {
  addReview,
  fetchReviews,
};
