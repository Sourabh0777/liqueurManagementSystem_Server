import { Request, Response, NextFunction } from 'express';
import * as userAuthService from '../services/auth.service';
import { generateAuthToken } from '../middlewares/generateUserJWT';
import { cookieOptions } from '../../utils/cookieOptions';
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
    return next(error);
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
    return res
      .cookie(
        'user_access_token',
        generateAuthToken(phoneNumber, otp),
        cookieOptions,
      )
      .status(201)
      .json({
        success: 'OTP Confirmed',
      });
  } catch (error) {
    console.log('error');
    return next(error);
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
    return next(error);
  }
};

const CurrentlyLoggedInUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('working');
    const user = req.body.decodeToken;
    console.log(user);
    return res.send(user);
  } catch (error) {
    return next(error);
  }
};
export {
  userRegisterController,
  userVerifyOtpController,
  userLoginController,
  CurrentlyLoggedInUserController,
};
