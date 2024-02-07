import express from 'express';
import * as adminAuthController from './controller/adminAuthController';
import * as adminUpdateDetailsController from './controller/adminUpdateDetailsContoller';
import * as adminDeleteController from './controller/adminDeleteController';
import * as adminProductController from './controller/adminProductController';
import * as userAuthController from '../user/controller/userAuthController';
import { verifyIsAdmin, verifyIsLoggedIn } from '../middleware/verifyAuthToken';

const adminRoutes = express();

// Auth related API's
adminRoutes.post('/registerAdmin', adminAuthController.adminRegisterController);
adminRoutes.post('/loginAdmin', adminAuthController.adminLoginController);

adminRoutes.use(verifyIsLoggedIn);
adminRoutes.use(verifyIsAdmin);
adminRoutes.put(
  '/changeAdminPassword',
  adminUpdateDetailsController.updateAdminPasswordController,
);

adminRoutes.put(
  '/updateAdminDetails',
  adminUpdateDetailsController.updateAdminDetailsController,
);

adminRoutes.delete('/deleteAdmin', adminDeleteController.deleteAdminController);
adminRoutes.post('/registerUser', userAuthController.userRegisterController);
adminRoutes.post('/verifyUser', userAuthController.userVerifyOtpController);
//Products Routes
adminRoutes.post('/addCategory', adminProductController.addCategoryController);
adminRoutes.post(
  '/addSubCategory',
  adminProductController.addSubCategoryController,
);
adminRoutes.post('/addProducts', adminProductController.addProductsController);

//Export
export default adminRoutes;
