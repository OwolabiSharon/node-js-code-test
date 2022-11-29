const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { searchValidation } = require('../../validations');
const searchController = require('../../controllers/search.controller');

const router = express.Router();
router.route('/')
  .get(validate(searchValidation.search), auth, searchController.search);

router.route('/history')
  .get(auth, searchController.getSearchHistory);

module.exports = router;
