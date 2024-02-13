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
    const adminId = req.params.id;
    if (!adminId) {
      throw new BadRequestError('No ID Provided');
    }
    const deleteAdminResponse = await adminService.deleteAdminService(
      Number(adminId),
    );
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
    const userId = req.params.id;
    if (!userId) {
      throw new BadRequestError('All input fields required');
    }
    const deleteUserResponse = await adminService.deleteUserService(
      Number(userId),
    );
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
    const vendorId = req.params.id;
    if (!vendorId) {
      throw new BadRequestError('All input fields required');
    }
    const deleteVendorResponse = await adminService.deleteVendorService(
      Number(vendorId),
    );
    return deleteVendorResponse.send(res);
  } catch (error) {
    console.log('Error deleting Vendor:', error);
    next(error);
  }
};

export { deleteAdminController, deleteUserController, deleteVendorController };
