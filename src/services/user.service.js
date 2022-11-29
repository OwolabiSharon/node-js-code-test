/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');
const { randomString } = require('../utils/utils');

const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });

  return user;
};

const getUser = async (id) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User deos not exist');
  }

  return user;
};

const createUser = async (userBody) => {
  if (await UserModel.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  if (await UserModel.isUserNameTaken(userBody.userName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }

  const emailToken = randomString(6);
  const expires = moment().add(7, 'days');
  const data = {
    ...userBody,
    emailVerificationToken: emailToken,
    emailVerificationExpires: expires,
    isEmailVerified: true,
  };

  return UserModel.create(data);
};

const verifyEmail = async (data) => {
  const { email, token } = data;
  const user = await getUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updateEmailStatus = await UserModel.findOneAndUpdate(
    { emailVerificationToken: token, emailVerificationExpires: { $gt: new Date() } },
    { $set: { isEmailVerified: true } },
    { new: true },
  );

  if (!updateEmailStatus) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email verification failed');
  }

  return { message: 'Email verified successfully' };
};

const loginUser = async (data) => {
  const { email } = data;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password Invalid');
  }

  if (user.isEmailVerified === false) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account inactive.');
  }

  const compare = await bcrypt.compare(data.password, user.password);

  if (compare === false) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password invalid');
  }

  const token = jwt.sign(
    {
      email: user.email,
      _id: user._id,
      firstname: user.firstName,
      lastName: user.lastname,
    },
    process.env.JWT_SECRET,
    // { expiresIn: '7d' },
  );

  return {
    message: 'Login successful',
    data: {
      token,
      user: {
        email: user.email,
        userName: user.userName,
        name: user.name,
        id: user.id,
      },
    },
  };
};

const getAuthUser = async (id) => {
  const user = await UserModel.findById(id).populate('interests');

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Operation failed');
  }

  return user;
};

const resetPassword = async (token, email, newPassword) => {
  const hashNewPassword = await bcrypt.hash(newPassword, 8);

  const updated = await UserModel.findOneAndUpdate(
    { resetPasswordToken: token, email },
    { $set: { password: hashNewPassword } },
    { new: true },
  );

  if (!updated) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Operation failed');
  } else {
    return { message: 'Password reset successful' };
  }
};

const selectInterests = async (userId, interests) => {
  const addUserInterests = await UserModel.findOneAndUpdate({ _id: userId },
    { $push: { interests: { $each: interests } } }, { new: true });

  if (!addUserInterests) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'operation failed');
  }

  return addUserInterests;
};

const updatePassword = async (data, password, userId) => {
  const compare = await bcrypt.compare(data.oldPassword, password);

  if (!compare) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password');
  }

  const hashNewPassword = await bcrypt.hash(data.newPassword, 8);

  const updated = await UserModel.findOneAndUpdate(
    { userId },
    { $set: { password: hashNewPassword } },
    { new: true },
  );

  if (!updated) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Operation failed');
  } else {
    return { message: 'Password reset successful' };
  }
};

const updateUser = async (userId, data) => {
  const updated = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $set: data },
    { new: true },
  );

  if (!updated) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Operation failed');
  } else {
    return updated;
  }
};

const followUser = async (userId, fId) => {
  const user = await getUser(userId);

  const followingAlready = user.following.find((id) => id.toString() === fId);

  if (followingAlready) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Followed already');
  }

  await UserModel.findOneAndUpdate({ _id: userId }, {
    $addToSet: { following: fId },
  });

  await UserModel.findOneAndUpdate({ _id: fId }, {
    $addToSet: { followers: userId },
  });

  return true;
};

const unFollowUser = async (userId, fId) => {
  await UserModel.findOneAndUpdate({ _id: userId }, {
    $pull: { following: fId },
  });

  await UserModel.findOneAndUpdate({ _id: fId }, {
    $pull: { followers: userId },
  });

  return true;
};

const viewFollowers = async (id) => {
  const user = await UserModel.findById(id).populate('followers.id');

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }

  return user.followers;
};

const viewFollowing = async (id) => {
  const user = await UserModel.findById(id).populate('following.id');

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }

  return user.following;
};

const search = async (searchTerm, search) => {
  if (searchTerm === "user") {
    const suggestions = await UserModel.find({
      $or: [
        {
          userName: {
            "$regex": `.*${search}`,
            "$options": "i"
          }
        },
      ]
    }).limit(5)
    .sort({
        userName: 'asc'
    })
    return suggestions
  }else if (searchTerm === "hashTag") {
    const suggestions = await PostModel.find({
      $or: [
        {
          post: {
            "$regex": `.*${search}`,
            "$options": "i"
          }
        },
      ]
    })
    .limit(5)
    .sort({
        post: 'asc'
    })

    return suggestions
  }
};

module.exports = {
  createUser,
  verifyEmail,
  getUserByEmail,
  getUser,
  loginUser,
  selectInterests,
  getAuthUser,
  resetPassword,
  updatePassword,
  updateUser,
  followUser,
  unFollowUser,
  viewFollowers,
  viewFollowing,
};
