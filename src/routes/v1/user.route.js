const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const { Upload } = require('../../middlewares/fileUpload');

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser);

router
  .route('/security/verify_email/:email/:token')
  .get(validate(userValidation.verifyEmail), userController.verifyEmail);

router
  .route('/login')
  .post(validate(userValidation.loginUser), userController.loginUser);

router
  .route('/forgotpassword')
  .post(validate(userValidation.forgotPassword), userController.forgotPassword);

router
  .route('/resetpassword')
  .post(validate(userValidation.resetPassword), userController.resetPassword);

router
  .route('/password')
  .put(validate(userValidation.updatePassword), auth, userController.updatePassword);

router
  .route('/selectInterests')
  .post(validate(userValidation.selectInterests), auth, userController.selectInterests);

router
  .route('/auth')
  .get(auth, userController.getAuthUser);

router
  .route('/updateUser')
  .put(validate(userValidation.updateUser), auth, userController.updateUser);

router
  .route('/profilePicture')
  .put(Upload.single('profilePicture'), auth, userController.updateUserProfilePicture);

router
  .route('/followUser')
  .post(validate(userValidation.followUser), auth, userController.followUser);

router
  .route('/unFollowUser')
  .post(validate(userValidation.unFollowUser), auth, userController.unFollowUser);

router
  .route('/viewFollowers')
  .get(validate(userValidation.viewFollowers), auth, userController.viewFollowers);

router
  .route('/viewFollowing')
  .get(validate(userValidation.viewFollowing), auth, userController.viewFollowing);

module.exports = router;
