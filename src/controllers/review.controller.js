/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { reviewService, fileUploadService } = require('../services');

const addReview = catchAsync(async (req, res) => {
  const { _id } = req.userData;

  const imagesurl = [];

  if (req.files.length > 0) {
    await Promise.all(
      req.files.map(async (file) => {
        const result = await fileUploadService.UploadFile(file.path);
        if (result) {
          imagesurl.push({ url: result.url, id: result.public_id });
        }
      }),
    );
    req.body.images = imagesurl;
  }

  const created = await productService.addProduct({ ...req.body, userId: _id });
  res.status(httpStatus.CREATED).send({ message: 'Created successfully', data: created, status: true });
});

const fetchReviews = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['startDate', 'endDate', 'categoryId', 'userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const data = await reviewService.fetchReviews(filter, options);
  res.status(httpStatus.CREATED).send({ message: 'fetched successfully', data, status: true });
});

module.exports = {
  addReview,
  fetchReviews,
};
