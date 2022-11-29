const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    userName: Joi.string().required(),
  }),
};

const verifyEmail = {
  params: Joi.object().keys({
    email: Joi.string().required().email(),
    token: Joi.string().required(),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const selectInterests = {
  body: Joi.object().keys({
    interests: Joi.array(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    token: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

const updatePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};

const updateUser = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      userName: Joi.string(),
      location: Joi.string(),
      bio: Joi.string(),
    }),
};

const followUser = {
  body: Joi.object()
    .keys({
      userId: Joi.custom(objectId).required(),
    }),
};

const unFollowUser = {
  body: Joi.object()
    .keys({
      userId: Joi.custom(objectId).required(),
    }),
};

module.exports = {
  loginUser,
  createUser,
  verifyEmail,
  resetPassword,
  forgotPassword,
  selectInterests,
  updatePassword,
  updateUser,
  followUser,
  unFollowUser,
};
