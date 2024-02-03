import express, { Request, Response } from 'express';
import * as userAuthController from './controller/userAuthController';
const userRoutes = express();
userRoutes.post('/registerUser', userAuthController.userRegisterController);
userRoutes.post('/verifyUserOTP', userAuthController.userVerifyOtpController);
userRoutes.post('/login', userAuthController.userLoginController);
userRoutes.put("/updateData",userAuthController.updateUserDataController);
userRoutes.get("/getUser",userAuthController.getUserController);
userRoutes.delete("/deleteUser",userAuthController.deleteUserController);

export default userRoutes;
