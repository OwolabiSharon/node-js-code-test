/* eslint-disable no-underscore-dangle */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, emailService, tokenService } = require('../services');
const fileUploadService = require('../services/fileUpload.service');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  await emailService.sendVerifyAccountEmail(user.email, user.emailVerificationToken);

  res
    .status(httpStatus.CREATED)
    .send({ message: `A mail have being sent to ${user.email}, Kindly verify you account.`, status: true });
});

const verifyEmail = catchAsync(async (req, res) => {
  const resp = await userService.verifyEmail(req.params);
  res.status(httpStatus.CREATED).send({ ...resp, status: true });
});

const loginUser = catchAsync(async (req, res) => {
  const resp = await userService.loginUser(req.body);
  res.status(httpStatus.CREATED).send({ ...resp, status: true });
});

const createInterests = catchAsync(async (req, res) => {
  const resp = await userService.createInterests();
  res.status(httpStatus.CREATED).send({ ...resp, status: true });
});

const getAuthUser = catchAsync(async (req, res) => {
  const { _id } = req.userData;
  const resp = await userService.getAuthUser(_id);

  res.status(httpStatus.CREATED).send({ message: 'fetched successfully', data: resp, status: true });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const token = await tokenService.saveResetPasswordToken(email);
  await emailService.sendResetPasswordEmail(email, token);

  res.status(httpStatus.CREATED).send({ message: 'Reset Password Token has been sent to your mail', status: true });
});

const resetPassword = catchAsync(async (req, res) => {
  const { email, token, password } = req.body;
  const resp = await userService.resetPassword(token, email, password);

  res.status(httpStatus.CREATED).send({ ...resp, status: true });
});

const updatePassword = catchAsync(async (req, res) => {
  const { _id } = req.userData;

  const user = await userService.getUser(_id);

  await userService.updatePassword(req.body, user.password, _id);

  res.status(httpStatus.CREATED).send({ message: 'Updated successfully.', status: true });
});

const selectInterests = catchAsync(async (req, res) => {
  const { _id } = req.userData;
  const resp = await userService.selectInterests(_id, req.body.interests);
  res.status(httpStatus.CREATED).send({ message: 'Interests saved successfully', data: resp, status: true });
});

const updateUser = catchAsync(async (req, res) => {
  const { _id } = req.userData;
  await userService.updateUser(_id, req.body);

  res.status(httpStatus.CREATED).send({ message: 'Updated successfully.', status: true });
});

const updateUserProfilePicture = catchAsync(async (req, res) => {
  const { _id } = req.userData;

  const user = await userService.getUser(_id);

  if (user.profilePicture.url) {
    await fileUploadService.DeleteFile(user.profilePicture.id);
  }
  const upload = await fileUploadService.UploadFile(req.file.path);

  await userService.updateUser(_id,
    { profilePicture: { url: upload.url, id: upload.public_id } });

  res.status(httpStatus.CREATED).send({ message: 'user profile picture updated successfully', data: upload.url, status: true });
});

const followUser = catchAsync(async (req, res) => {
  const { _id } = req.userData;
  const resp = await userService.followUser(_id, req.body.userId);
  res.status(httpStatus.CREATED).send({ message: 'user followed successfully', data: resp, status: true });
});

const unFollowUser = catchAsync(async (req, res) => {
  const { _id } = req.userData;
  const resp = await userService.unFollowUser(_id, req.body.userId);
  res.status(httpStatus.CREATED).send({ message: 'user unfollowed successfully', data: resp, status: true });
});

const viewFollowers = catchAsync(async (req, res) => {
  const { _id } = req.userData;
  const resp = await userService.viewFollowers(_id);
  res.status(httpStatus.CREATED).send({ message: '', data: resp, status: true });
});

const viewFollowing = catchAsync(async (req, res) => {
  const { _id } = req.userData;
  const resp = await userService.viewFollowing(_id);
  res.status(httpStatus.CREATED).send({ message: '', data: resp, status: true });
});

const search = catchAsync(async (req, res) => {
  const { _id } = req.userData;
  const resp = await userService.search(req.body.searchTerm,req.body.search);
  res.status(httpStatus.CREATED).send({ message: 'search results  :', data: resp, status: true });
});

module.exports = {
  createUser,
  verifyEmail,
  loginUser,
  selectInterests,
  createInterests,
  getAuthUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateUser,
  updateUserProfilePicture,
  followUser,
  unFollowUser,
  viewFollowers,
  viewFollowing,
};
