import { Request, Response, NextFunction } from 'express';
import * as userAuthService from '../services/auth.service';
import { generateAuthToken } from '../middlewares/generateUserJWT';
import { cookieOptions } from '../../utils/cookieOptions';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from '../../core/ApiError';
import imageValidate from '../middlewares/image.validate';
import path from 'path';
import fs from 'fs';

const userRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { phoneNumber } = req.body;
    const userRegistrationResponse = await userAuthService.userRegisterService({
      phoneNumber,
    });
    return userRegistrationResponse.send(res);
  } catch (error) {
    console.log('userRegisterController error:', error);
    next(error);
  }
};

const userVerifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { otp, phoneNumber } = req.body;
    const userVerifyOtpResponse = await userAuthService.userVerifyOtpService({
      otp,
      phoneNumber,
    });
    if (userVerifyOtpResponse && userVerifyOtpResponse.id) {
      const { id } = userVerifyOtpResponse;
      return res
        .cookie(
          'user_access_token',
          generateAuthToken(phoneNumber, id),
          cookieOptions,
        )
        .status(201)
        .json({
          success: 'OTP Confirmed',
        });
    }
  } catch (error) {
    console.log('userVerifyOtpController error:', error);
    next(error);
  }
};

const userLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { phoneNumber } = req.body;
    const userLoginResponse = await userAuthService.userLoginService({
      phoneNumber,
    });
    return userLoginResponse.send(res);
  } catch (error) {
    console.log('userLoginController error:', error);
    next(error);
  }
};

const updateUserDataController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userDataUpdateResponse = await userAuthService.userDataUpdateService(
      req.body,
    );
    return userDataUpdateResponse.send(res);
  } catch (error) {
    console.log('updateUserDataController error:', error);
    next(error);
  }
};

const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getUserResponse = await userAuthService.getUserService(req.body);
    return getUserResponse.send(res);
  } catch (error) {
    console.log('getUserController error:', error);
    next(error);
  }
};

const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleteUserResponse = await userAuthService.deleteUserService(
      req.body,
    );
    return deleteUserResponse.send(res);
  } catch (error) {
    console.log('deleteUserController error:', error);
    next(error);
  }
};

const CurrentlyLoggedInUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleteUserResponse = await userAuthService.deleteUserService(
      req.body,
    );
    return deleteUserResponse.send(res);
  } catch (error) {
    console.log('CurrentlyLoggedInUserController error:', error);
    next(error);
  }
};

const userImageUploadController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.files) {
      return new NotFoundError('Image file not uploaded');
    }
    imageValidate(req.files.image);

    const imageUploadResponse = await userAuthService.uploadImageService(
      req.files.image,
      req.body.decodeToken.id,
    );
    return imageUploadResponse.send(res);
  } catch (error) {
    next(error);
  }
};

const userDeleteImageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const imageDeleteResponse = await userAuthService.deleteImageService(
      req.body.decodeToken.id,
    );
    return imageDeleteResponse.send(res);
  } catch (error) {
    next(error);
  }
};

export {
  userRegisterController,
  userVerifyOtpController,
  userLoginController,
  updateUserDataController,
  getUserController,
  deleteUserController,
  CurrentlyLoggedInUserController,
  userImageUploadController,
  userDeleteImageController,
};
