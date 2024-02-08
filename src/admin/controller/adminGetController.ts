import { Request, Response, NextFunction } from 'express';
import prisma_client from '../../config/prisma';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import { log } from 'console';

const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma_client.user.findMany();
    if (!users) {
      throw new BadRequestError('No users Found!');
    }
    const allUsers = new SuccessResponse('Users Fetched successfully', users);
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
    const vendors = await prisma_client.vendor.findMany();
    if (!vendors) {
      throw new BadRequestError('No vendors Found!');
    }

    const allVendors = new SuccessResponse(
      'Vendors fetched Successfully',
      vendors,
    );
    return allVendors.send(res);
  } catch (err) {
    return next(err);
  }
};

export { getAllUsersController, getAllVendorsController };
