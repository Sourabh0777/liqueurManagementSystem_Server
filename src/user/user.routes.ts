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
import * as orderController from './controller/userOrderController';

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
userRoutes.put('/updateData', userAuthController.updateUserDataController);
userRoutes.get('/getUser', userAuthController.getUserController);
userRoutes.delete('/deleteUser', userAuthController.deleteUserController);
userRoutes.post('/uploadImage', userAuthController.userImageUploadController);
userRoutes.put(
  '/deleteUserImage/:imagePath',
  userAuthController.userDeleteImageController,
);

userRoutes.post('/cart/:vendorID', cartController.addCartController);
userRoutes.get('/getCart', cartController.getCartController);
userRoutes.delete('/removeCart', cartController.deleteCartController);
userRoutes.patch('/removeCartItem', cartController.deleteItemController);

userRoutes.post('/order', orderController.createOrderController);
userRoutes.get('/getOrder', orderController.getOrderController);
// userRoutes.put('/cancelOrder', orderController.cancelOrderController);
userRoutes.get('/ViewOrderHistory', orderController.getAllUserOrdersController);
export default userRoutes;
