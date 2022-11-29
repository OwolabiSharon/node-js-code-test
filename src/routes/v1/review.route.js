const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { reviewValidation } = require('../../validations');
const reviewController = require('../../controllers/review.controller');
const { Upload } = require('../../middlewares/fileUpload');

const router = express.Router();
// validate(reviewValidation.addReview),
router.route('/')
  .post(Upload.array('images'), auth, reviewController.addReview)
  .get(validate(reviewValidation.fetchReviews), auth, reviewController.fetchReviews);

module.exports = router;
