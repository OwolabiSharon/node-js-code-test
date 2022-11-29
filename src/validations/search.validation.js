const Joi = require('joi');

const search = {
  query: Joi.object().keys({
    type: Joi.string().valid('users', 'posts', 'reviews').required(),
    input: Joi.string().required(),
  }),
};

module.exports = {
  search,
};
