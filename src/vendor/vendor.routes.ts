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
  '/registervendor',
  validateVendorRegisterRequest,
  isRequestValidated,
  vendorAuthController.vendorRegisterController,
);
vendorRoutes.post(
  '/loginvendor',
  validateVendorLoginRequest,
  isRequestValidated,
  vendorAuthController.vendorLoginController,
);

vendorRoutes.get('/getvendor', vendorAuthController.getVendorController);

vendorRoutes.delete(
  '/deletevendor',
  validateVendorDeleteRequest,
  isRequestValidated,
  vendorAuthController.deleteVendorController,
);

export default vendorRoutes;
