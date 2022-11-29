// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
const ReviewModel = require('../models/review.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const SearchModel = require('../models/search.model');

const search = async (userId,type, input) => {
  if (type === 'users') {
    const users = await UserModel.find({
      userName: {
        $regex: input,
        $options: 'i',
      },
    }).limit(10)
      .sort({
        userName: 'asc',
      });
      const data = {
        userId,
        searchType: "User",
        search: input,
      };
      const search = await SearchModel.create(data)

    return users;
  } if (type === 'posts') {
    const hashtags = await PostModel.find({
      post: {
        $regex: input,
        $options: 'i',
      },
    }).limit(10)
      .sort({
        post: 'asc',
      });

      const data = {
        userId,
        searchType: "Post",
        search: input,
      };
      const search = await SearchModel.create(data)

    return hashtags;
  } if (type === 'reviews') {
    const reviews = await ReviewModel.find({
      title: {
        $regex: input,
        $options: 'i',
      },
    }).limit(10)
      .sort({
        post: 'asc',
      });

      const data = {
        userId,
        searchType: "Review",
        search: input,
      };
      const search = await SearchModel.create(data)

    return reviews;
  }

};

const getSearchHistory = async (userId) => {
  const searches = await SearchModel.find({userId});

  if (!searches) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'you havent been searching anything');
  }

  return searches;
};
module.exports = {
  search,
  getSearchHistory
};
