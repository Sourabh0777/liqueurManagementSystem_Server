import express, { Request, Response, NextFunction } from 'express';
import * as userAuthController from './controller/userAuthController';
import { verifyIsLoggedIn } from '../middleware/verifyAuthToken';
import {
  validateUserRegisterRequest,
  isRequestValidated,
  validateVerifyOtpRequest,
  validateLoginRequest,
} from './middlewares/userValidator';

const userRoutes = express();

userRoutes.post(
  '/registerUser',
  validateUserRegisterRequest,
  isRequestValidated,
  userAuthController.userRegisterController,
);
userRoutes.post(
  '/verifyUserOTP',
  validateVerifyOtpRequest,
  isRequestValidated,
  userAuthController.userVerifyOtpController,
);
userRoutes.post(
  '/login',
  validateLoginRequest,
  isRequestValidated,
  userAuthController.userLoginController,
);
userRoutes.use(verifyIsLoggedIn);
// userRoutes.put('/updateData', userAuthController.updateUserDataController);
// userRoutes.get('/getUser', userAuthController.getUserController);
// userRoutes.delete('/deleteUser', userAuthController.deleteUserController);

export default userRoutes;
