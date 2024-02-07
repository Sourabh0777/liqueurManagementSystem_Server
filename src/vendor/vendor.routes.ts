import express, { Request, Response, NextFunction } from 'express';
import * as vendorAuthController from './controller/vendorAuthController';
import { vendorRegisterController } from './controller/vendorAuthController';
const vendorRoutes = express();

vendorRoutes.post(
  '/registervendor',
  vendorAuthController.vendorRegisterController,
);
vendorRoutes.post('/loginvendor', vendorAuthController.vendorLoginController);
vendorRoutes.get('/getvendor', vendorAuthController.getVendorController);
vendorRoutes.delete(
  '/deletevendor',
  vendorAuthController.deleteVendorController,
);

export default vendorRoutes;
