const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    post: Joi.string().required(),
    categoryId: Joi.required().custom(objectId),
  }),
};

const fetchPosts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.string(),
    page: Joi.string(),
    categoryId: Joi.required().custom(objectId),
    startDate: Joi.string(),
    endDate: Joi.string(),
  }),
};

module.exports = {
  createPost,
  fetchPosts,
};
