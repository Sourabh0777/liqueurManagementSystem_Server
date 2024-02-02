import express, { Request, Response } from "express";
import * as adminAuthController from "./controller/adminAuthController";
const adminRoutes = express();

// Auth related API's
adminRoutes.post("/registerAdmin", adminAuthController.adminRegisterController);
adminRoutes.post("/loginAdmin", adminAuthController.adminLoginController);

//Export
export default adminRoutes;
