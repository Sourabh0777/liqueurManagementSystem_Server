import express, { Request, Response } from "express";
import * as userAuthController from "./controller/userAuthController";
const userRoutes = express();
userRoutes.use("/registerUser", userAuthController.userRegisterController);
userRoutes.use("/verifyUserOTP", userAuthController.userVerifyOtpController);
userRoutes.put("/updateData/:id",userAuthController.updateUserDataController);

export default userRoutes;
