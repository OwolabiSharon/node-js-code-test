const mongoose = require('mongoose');
const { paginate } = require('./plugins');

const PostSchema = mongoose.Schema({
  post: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},
{
  timestamps: true,
});

PostSchema.plugin(paginate);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
