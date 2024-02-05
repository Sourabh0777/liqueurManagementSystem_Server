// controllers/admin.controller.ts
import { NextFunction, Request, Response } from 'express';
import * as adminService from '../services/adminDelete.service';
import { NotFoundError } from '../../core/ApiError';

const deleteAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const adminId = req.body.id;
    const deleteAdminResponse = await adminService.deleteAdminService(adminId);
    return deleteAdminResponse.send(res);
  } catch (error) {
    console.log('Error deleting admin:', error);
    next(error);
  }
};

export { deleteAdminController };
