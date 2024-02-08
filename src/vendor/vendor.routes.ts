import express, { Request, Response, NextFunction } from 'express';
import * as vendorAuthController from './controller/vendorAuthController';
import { vendorRegisterController } from './controller/vendorAuthController';
import {
  isRequestValidated,
  validateVendorDeleteRequest,
  validateVendorLoginRequest,
  validateVendorRegisterRequest,
} from './middlewares/vendorValidator';
const vendorRoutes = express();

vendorRoutes.post(
  '/registerVendor',
  validateVendorRegisterRequest,
  isRequestValidated,
  vendorAuthController.vendorRegisterController,
);
vendorRoutes.post(
  '/loginVendor',
  validateVendorLoginRequest,
  isRequestValidated,
  vendorAuthController.vendorLoginController,
);

vendorRoutes.get('/getVendor', vendorAuthController.getVendorController);

vendorRoutes.delete(
  '/deleteVendor',
  validateVendorDeleteRequest,
  isRequestValidated,
  vendorAuthController.deleteVendorController,
);

export default vendorRoutes;
