import express, { Request, Response, NextFunction} from 'express';
import * as vendorAuthController from './controller/vendorAuthController'
const vendorRouter = express();

vendorRouter.get('/getvendor', vendorAuthController.getVendorController);

export default vendorRouter;
