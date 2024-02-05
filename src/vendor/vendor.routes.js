import express, { Request, Response } from 'express';
const rootRouter = express();
rootRouter.use('/vendor', vendorAuthController);
export default rootRouter;
