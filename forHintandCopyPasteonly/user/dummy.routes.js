import express, { Request, Response } from "express";
const rootRouter = express();
rootRouter.use("/user", userAuthController);
export default rootRouter;
