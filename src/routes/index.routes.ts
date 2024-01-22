import { Router } from "express";
import { login } from "../controller/auth";
import authRoutes from "./auth.routes";
const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
export default rootRouter;
