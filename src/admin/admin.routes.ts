import express, { Request, Response } from "express";
import * as adminAuthController from "./controller/adminAuthController";
const adminRouter = express();

// Auth related API's
adminRouter.post("/registerAdmin", adminAuthController.adminRegisterController);

//Export
export default adminRouter;
