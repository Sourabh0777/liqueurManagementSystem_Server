import express, { Request, Response } from "express";
import userRoutes from "./user/user.routes";
// import adminRouter from "./admin/admin.routes";

const rootRouter = express();

//Routes
rootRouter.use("/user", userRoutes);
// rootRouter.use("/admin", adminRouter);

export default rootRouter;
