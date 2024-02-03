<<<<<<< HEAD
import express, { Request, Response } from 'express';
import userRoutes from './user/user.routes';
import adminRouter from './admin/admin.routes';
import adminRoutes from './admin/admin.routes';
=======
import express, { Request, Response } from "express";
import userRoutes from "./user/user.routes";
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
// import adminRouter from "./admin/admin.routes";

const rootRouter = express();

//Routes
<<<<<<< HEAD
rootRouter.use('/user', userRoutes);
rootRouter.use('/admin', adminRoutes);
=======
rootRouter.use("/user", userRoutes);
// rootRouter.use("/admin", adminRouter);
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187

export default rootRouter;
