const express = require('express');
const CheckAuth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { postValidation } = require('../../validations');
const postController = require('../../controllers/post.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(postValidation.createPost), CheckAuth, postController.createPost)
  .get(validate(postValidation.fetchPosts), CheckAuth, postController.fetchPosts);

module.exports = router;
