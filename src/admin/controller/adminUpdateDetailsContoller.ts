import { NextFunction, Request, Response } from 'express';
import * as adminUpdateDetails from '../services/adminUpdateDetials.service';
import { AuthFailureError, NotFoundError } from '../../core/ApiError';

const updateAdminPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    const updatePasswordResponse =
      await adminUpdateDetails.updateAdminPasswordService(
        username,
        currentPassword,
        newPassword,
      );
    return updatePasswordResponse.send(res);
  } catch (error) {
    console.log('Error updating password:', error);
    next(error);
  }
};

const updateAdminDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedAdmin = await adminUpdateDetails.updateAdminDetailsService(
      req.body,
    );
    return updatedAdmin.send(res);
  } catch (error) {
    console.log('Error updating admin details:', error);
    next(error);
  }
};

export { updateAdminPasswordController, updateAdminDetailsController };
