<<<<<<< HEAD
import express, { Request, Response } from 'express';
import * as userAuthController from './controller/userAuthController';
const userRoutes = express();
userRoutes.post('/registerUser', userAuthController.userRegisterController);
userRoutes.post('/verifyUserOTP', userAuthController.userVerifyOtpController);
userRoutes.post('/login', userAuthController.userLoginController);
=======
import express, { Request, Response } from "express";
import * as userAuthController from "./controller/userAuthController";
const userRoutes = express();
userRoutes.use("/registerUser", userAuthController.userRegisterController);
userRoutes.use("/verifyUserOTP", userAuthController.userVerifyOtpController);
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187

export default userRoutes;
