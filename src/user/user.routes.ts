import express, { Request, Response, NextFunction } from 'express';
import * as userAuthController from './controller/userAuthController';
import { verifyIsLoggedIn } from '../middleware/verifyAuthToken';
import {
  validateUserRegisterRequest,
  isRequestValidated,
  validateVerifyOtpRequest,
  validateLoginRequest,
} from './middlewares/userValidator';
import * as cartController from './controller/userCartController';
import * as orderController from './controller/orderController';

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

userRoutes.post('/cart/:inventoryId', cartController.addCartController);
userRoutes.get('/getCart', cartController.getCartController);
userRoutes.delete('/removeCart', cartController.deleteCartController);
userRoutes.put('/updateCart/:inventoryId', cartController.updateCartController);

userRoutes.post('/order', orderController.createOrderController);
userRoutes.get('/getOrder', orderController.getOrderController);
userRoutes.get('/getAllOrder', orderController.getAllOrderController);
userRoutes.put('/canelOrder', orderController.cancelOrderController);
export default userRoutes;
