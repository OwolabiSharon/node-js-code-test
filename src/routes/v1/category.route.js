const express = require('express');
// const validate = require('../../middlewares/validate');
// const auth = require('../../middlewares/auth');
const categoryController = require('../../controllers/category.controllers');

const router = express.Router();

router
  .route('/')
  .post(categoryController.createCategory);

router
  .route('/')
  .get(categoryController.fetchCategories);

module.exports = router;
