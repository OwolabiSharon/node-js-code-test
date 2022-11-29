const httpStatus = require('http-status');
const moment = require('moment');
const { randomDigit } = require('../utils/utils');
const UserModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const saveResetPasswordToken = async (email) => {
  const token = randomDigit();
  const expires = moment().add(30, 'minutes');

  const updated = await UserModel.findOneAndUpdate(
    { email },
    {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
    },
    { new: true },
  );

  if (!updated) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'request failed');
  } else {
    return token;
  }
};

module.exports = {
  saveResetPasswordToken,
};
