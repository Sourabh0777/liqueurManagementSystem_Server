import express, { Request, Response, NextFunction } from 'express';
import * as vendorAuthController from './controller/vendorAuthController';
import * as vendorInventoryController from './controller/vendorInventoryController';
import {
  isRequestValidated,
  // validateVendorDeleteRequest,
  validateVendorLoginRequest,
  validateVendorRegisterRequest,
} from './middlewares/vendorValidator';
import { verifyIsLoggedIn } from '../middleware/verifyAuthToken';
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

vendorRoutes.use(verifyIsLoggedIn);
vendorRoutes.get('/getVendor/:id', vendorAuthController.getVendorController);

vendorRoutes.delete(
  '/deleteVendor',
  isRequestValidated,
  vendorAuthController.deleteVendorController,
);

vendorRoutes.put(
  '/updateVendor',
  vendorAuthController.updateVendorDataController,
);

vendorRoutes.put(
  '/updateVendorPassword',
  vendorAuthController.updateVendorPasswordController,
);

vendorRoutes.post(
  '/addInventoryItem',
  vendorInventoryController.createInventoryItemController,
);

vendorRoutes.delete(
  '/deleteInventoryItem/:id',
  vendorInventoryController.deleteInventoryItemController,
);

vendorRoutes.get(
  '/getVendorInventory',
  vendorInventoryController.getVendorInventoryService,
);
vendorRoutes.put(
  '/updateInventoryItem/:id',
  vendorInventoryController.updateInventoryItemController,
);
export default vendorRoutes;
