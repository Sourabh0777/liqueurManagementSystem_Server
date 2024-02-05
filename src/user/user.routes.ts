<<<<<<< HEAD
<<<<<<< HEAD
import express, { Request, Response } from 'express';
=======
import express, { Request, Response, NextFunction } from 'express';
>>>>>>> b77e216d91bd6c1328849815beb9469289ee93a3
import * as userAuthController from './controller/userAuthController';
import { verifyIsLoggedIn } from '../middleware/verifyAuthToken';

const userRoutes = express();

userRoutes.post('/registerUser', userAuthController.userRegisterController);
userRoutes.post('/verifyUserOTP', userAuthController.userVerifyOtpController);
userRoutes.post('/login', userAuthController.userLoginController);
<<<<<<< HEAD
=======
import express, { Request, Response } from "express";
import * as userAuthController from "./controller/userAuthController";
const userRoutes = express();
userRoutes.use("/registerUser", userAuthController.userRegisterController);
userRoutes.use("/verifyUserOTP", userAuthController.userVerifyOtpController);
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
=======
userRoutes.use(verifyIsLoggedIn);
userRoutes.put('/updateData', userAuthController.updateUserDataController);
userRoutes.get('/getUser', userAuthController.getUserController);
userRoutes.delete('/deleteUser', userAuthController.deleteUserController);
>>>>>>> b77e216d91bd6c1328849815beb9469289ee93a3

export default userRoutes;
