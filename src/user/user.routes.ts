import express, { Request, Response, NextFunction } from 'express';
import * as userAuthController from './controller/userAuthController';
import { verifyIsLoggedIn } from '../middleware/verifyAuthToken';

const userRoutes = express();

userRoutes.post('/registerUser', userAuthController.userRegisterController);
userRoutes.post('/verifyUserOTP', userAuthController.userVerifyOtpController);
userRoutes.post('/login', userAuthController.userLoginController);
userRoutes.use(verifyIsLoggedIn);
// userRoutes.put('/updateData', userAuthController.updateUserDataController);
// userRoutes.get('/getUser', userAuthController.getUserController);
// userRoutes.delete('/deleteUser', userAuthController.deleteUserController);

export default userRoutes;
