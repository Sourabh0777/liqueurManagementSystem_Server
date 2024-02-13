import express from 'express';
import * as adminAuthController from './controller/adminAuthController';
import * as adminUpdateDetailsController from './controller/adminUpdateDetailsContoller';
import * as adminDeleteController from './controller/adminDeleteController';
import * as adminProductController from './controller/adminProductController';
import * as userAuthController from '../user/controller/userAuthController';
import * as vendorAuthController from '../vendor/controller/vendorAuthController';
import * as adminGetController from '../admin/controller/adminGetController';
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
  validateupdateProductRequest,
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
  '/deleteAdmin/:id',
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

adminRoutes.post(
  '/registerVendor',
  vendorAuthController.vendorRegisterController,
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
//Products Routes
adminRoutes.get(
  '/getAllProducts',
  adminProductController.getAllProductsController,
);
adminRoutes.get('/getProduct/:id', adminProductController.getProductController);
adminRoutes.post(
  '/addProduct',
  validateAddProduct,
  isRequestValidated,
  adminProductController.addProductsController,
);
adminRoutes.put(
  '/updateProduct/:id',
  validateupdateProductRequest,
  isRequestValidated,
  adminProductController.updateProductsController,
);
adminRoutes.delete(
  '/deleteProduct/:id',
  adminProductController.deleteProductsController,
);
adminRoutes.get('/getAllUsers', adminGetController.getAllUsersController);
adminRoutes.get('/getAllVendors', adminGetController.getAllVendorsController);
adminRoutes.delete(
  '/deleteUser/:id',
  adminDeleteController.deleteUserController,
);
adminRoutes.delete(
  '/deleteVendor/:id',
  adminDeleteController.deleteVendorController,
);
adminRoutes.post('/addProducts', adminProductController.addProductsController);
adminRoutes.get('/getAllCategories', adminProductController.getAllCategories);
adminRoutes.get(
  '/getAllSubCategories',
  adminProductController.getAllSubCategories,
);
adminRoutes.put(
  '/updateCategory',
  adminProductController.updateCategoryController,
);
adminRoutes.put(
  '/updateSubCategory',
  adminProductController.updateSubCategoryController,
);
adminRoutes.delete(
  '/deleteCategory/:id',
  adminProductController.deleteCategoryController,
);
adminRoutes.delete(
  '/deleteSubCategory/:id',
  adminProductController.deleteSubCategoryController,
);
adminRoutes.get(
  '/getCategory/:id',
  adminProductController.getCategoryController,
);
adminRoutes.get(
  '/getSubCategory/:id',
  adminProductController.getSubCategoryController,
);
//Export
export default adminRoutes;
