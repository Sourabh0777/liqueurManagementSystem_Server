import express from 'express';
import * as adminAuthController from './controller/adminAuthController';
import * as adminUpdateDetailsController from './controller/adminUpdateDetailsContoller';
import * as adminDeleteController from './controller/adminDeleteController';
import * as adminProductController from './controller/adminProductController';
import * as userAuthController from '../user/controller/userAuthController';
import { verifyIsAdmin, verifyIsLoggedIn } from '../middleware/verifyAuthToken';
import {
  isRequestValidated,
  validateAddCategory,
  validateAddProduct,
  validateAddSubCategory,
  validateAdminLoginRequest,
  validateAdminRegisterRequest,
  validateDeleteAdminRequest,
  validateUpdateAdminPassword,
} from './middleware/adminvalidator';

import {
  validateUserRegisterRequest,
  validateVerifyOtpRequest,
} from '../user/middlewares/userValidator';
const adminRoutes = express();

// Auth related API's
adminRoutes.post(
  '/registerAdmin',
  validateAdminRegisterRequest,
  isRequestValidated,
  adminAuthController.adminRegisterController,
);
adminRoutes.post(
  '/loginAdmin',
  validateAdminLoginRequest,
  isRequestValidated,
  adminAuthController.adminLoginController,
);

adminRoutes.use(verifyIsLoggedIn);
adminRoutes.use(verifyIsAdmin);
adminRoutes.put(
  '/changeAdminPassword',
  validateUpdateAdminPassword,
  isRequestValidated,
  adminUpdateDetailsController.updateAdminPasswordController,
);

adminRoutes.put(
  '/updateAdminDetails',
  adminUpdateDetailsController.updateAdminDetailsController,
);

adminRoutes.delete(
  '/deleteAdmin',
  validateDeleteAdminRequest,
  isRequestValidated,
  adminDeleteController.deleteAdminController,
);

adminRoutes.post(
  '/registerUser',
  validateUserRegisterRequest,
  isRequestValidated,
  userAuthController.userRegisterController,
);
adminRoutes.post(
  '/verifyUser',
  validateVerifyOtpRequest,
  isRequestValidated,
  userAuthController.userVerifyOtpController,
);
//Products Routes
adminRoutes.post(
  '/addCategory',
  validateAddCategory,
  isRequestValidated,
  adminProductController.addCategoryController,
);
adminRoutes.post(
  '/addSubCategory',
  validateAddSubCategory,
  isRequestValidated,
  adminProductController.addSubCategoryController,
);
adminRoutes.post(
  '/addProducts',
  validateAddProduct,
  isRequestValidated,
  adminProductController.addProductsController,
);

//Export
export default adminRoutes;
