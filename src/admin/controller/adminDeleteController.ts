// controllers/admin.controller.ts
import { NextFunction, Request, Response } from 'express';
import * as adminService from '../services/adminDelete.service';
import { BadRequestError } from '../../core/ApiError';
import { NotFoundError } from '../../core/ApiError';

const deleteAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const adminId = req.body.id;
    if (!adminId) {
      throw new BadRequestError('All input fields required');
    }
    const deleteAdminResponse = await adminService.deleteAdminService(adminId);
    return deleteAdminResponse.send(res);
  } catch (error) {
    console.log('Error deleting admin:', error);
    next(error);
  }
};

const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.id;
    if (!userId) {
      throw new BadRequestError('All input fields required');
    }
    const deleteUserResponse = await adminService.deleteUserService(userId);
    return deleteUserResponse.send(res);
  } catch (error) {
    console.log('Error deleting admin:', error);
    next(error);
  }
};

const deleteVendorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vendorId = req.body.id;
    if (!vendorId) {
      throw new BadRequestError('All input fields required');
    }
    const deleteVendorResponse = await adminService.deleteVendorService(
      vendorId,
    );
    return deleteVendorResponse.send(res);
  } catch (error) {
    console.log('Error deleting Vendor:', error);
    next(error);
  }
};

export { deleteAdminController, deleteUserController, deleteVendorController };
