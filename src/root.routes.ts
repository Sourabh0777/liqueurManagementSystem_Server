import express, { Request, Response } from "express";
import userRoutes from "./user/user.routes";

const rootRouter = express();
rootRouter.use("/user", userRoutes);

export default rootRouter;
