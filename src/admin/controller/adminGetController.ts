import { Request, Response, NextFunction } from 'express';
import prisma_client from '../../config/prisma';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import * as adminGetAllService from '../services/adminGet.service';

const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allUsers = await adminGetAllService.getAllUsersService();
    return allUsers.send(res);
  } catch (err) {
    return next(err);
  }
};

const getAllVendorsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allVendors = await adminGetAllService.getAllVendorsService();
    return allVendors.send(res);
  } catch (err) {
    return next(err);
  }
};

export { getAllUsersController, getAllVendorsController };
