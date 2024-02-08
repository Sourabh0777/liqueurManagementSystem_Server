import express, { Request, Response, NextFunction } from 'express';
import * as vendorAuthController from './controller/vendorAuthController';
import { vendorRegisterController } from './controller/vendorAuthController';
const vendorRoutes = express();

vendorRoutes.post(
  '/registerVendor',
  vendorAuthController.vendorRegisterController,
);
vendorRoutes.post('/loginVendor', vendorAuthController.vendorLoginController);
vendorRoutes.get('/getVendor', vendorAuthController.getVendorController);
vendorRoutes.delete(
  '/deleteVendor',
  vendorAuthController.deleteVendorController,
);

export default vendorRoutes;
