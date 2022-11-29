const mongoose = require('mongoose');
const { paginate } = require('./plugins');

const ReviewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  category: {
    type: String,
  },
  review: {
    type: String,
    date: Date,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  images: [{
    url: { type: String },
    id: { type: String },
  }],
},
{
  timestamps: true,
});

ReviewSchema.plugin(paginate);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
