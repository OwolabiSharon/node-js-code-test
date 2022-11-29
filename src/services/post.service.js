/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const PostModel = require('../models/post.model');

const fetchPost = async (id) => {
  const post = await PostModel.findById(id).populate('categoryId');

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'operation failed');
  }

  return post;
};

const createPost = async (data) => {
  const post = await PostModel.create(data);

  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'operation failed');
  }

  return fetchPost(post._id);
};

const fetchPosts = async (filter, paginationOptions) => {
  const posts = await PostModel.paginate(filter, { ...paginationOptions, populate: 'userId categoryId' });

  return posts;
};

module.exports = {
  createPost,
  fetchPosts,
};
