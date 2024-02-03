import express, { Request, Response } from 'express';
import * as userAuthController from './controller/userAuthController';
const userRoutes = express();
userRoutes.post('/registerUser', userAuthController.userRegisterController);
userRoutes.post('/verifyUserOTP', userAuthController.userVerifyOtpController);
userRoutes.post('/login', userAuthController.userLoginController);

export default userRoutes;
