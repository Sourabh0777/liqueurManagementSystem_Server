<<<<<<< HEAD
import express, { Request, Response } from "express";
import * as adminAuthController from "./controller/adminAuthController";
<<<<<<< HEAD
=======
import express, { Request, Response } from 'express';
import * as adminAuthController from './controller/adminAuthController';
import * as adminUpdateDetailsController from './controller/adminUpdateDetailsContoller';
import * as adminDeleteController from './controller/adminDeleteController';
>>>>>>> b77e216d91bd6c1328849815beb9469289ee93a3
const adminRoutes = express();

// Auth related API's
adminRoutes.post('/registerAdmin', adminAuthController.adminRegisterController);
adminRoutes.post('/loginAdmin', adminAuthController.adminLoginController);
adminRoutes.put(
  '/changeAdminPassword',
  adminUpdateDetailsController.updateAdminPasswordController,
);

adminRoutes.put(
  '/updateAdminDetails',
  adminUpdateDetailsController.updateAdminDetailsController,
);

adminRoutes.delete('/deleteAdmin', adminDeleteController.deleteAdminController);
//Export
export default adminRoutes;
=======
const adminRouter = express();

// Auth related API's
adminRouter.post("/registerAdmin", adminAuthController.adminRegisterController);

//Export
export default adminRouter;
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
