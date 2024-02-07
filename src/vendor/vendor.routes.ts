import express, { Request, Response, NextFunction} from 'express';
import * as vendorAuthController from './controller/vendorAuthController'
import { vendorRegisterController } from './controller/vendorAuthController';
const vendorRoutes = express();

vendorRoutes.post('/registervendor',vendorAuthController.vendorRegisterController);
vendorRoutes.post('/loginvendor',vendorAuthController.vendorLoginController);
vendorRoutes.get('/getvendor', vendorAuthController.getVendorController);
vendorRoutes.put('/updatevendor', vendorAuthController.updateVendorController);
vendorRoutes.delete('/deletevendor', vendorAuthController.deleteVendorController);

export default vendorRoutes;
