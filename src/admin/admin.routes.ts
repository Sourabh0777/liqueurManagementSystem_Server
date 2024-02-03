import express, { Request, Response } from "express";
import * as adminAuthController from "./controller/adminAuthController";
<<<<<<< HEAD
const adminRoutes = express();

// Auth related API's
adminRoutes.post("/registerAdmin", adminAuthController.adminRegisterController);
adminRoutes.post("/loginAdmin", adminAuthController.adminLoginController);

//Export
export default adminRoutes;
=======
const adminRouter = express();

// Auth related API's
adminRouter.post("/registerAdmin", adminAuthController.adminRegisterController);

//Export
export default adminRouter;
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
