<<<<<<< HEAD
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

export { userRegisterController, userVerifyOtpController, userLoginController };
=======
import { Request, Response, NextFunction } from "express";
import * as userAuthService from "../services/auth.service";
const userRegisterController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phoneNumber } = req.body;
    const userRegistrationResponse = await userAuthService.userRegisterService({ phoneNumber });
    return userRegistrationResponse.send(res);
  } catch (error) {
    console.log("🚀 ~ userRegisterController ~ error:", error);
    next(error);
  }
};
const userVerifyOtpController = async (req: Request, res: Response) => {
  const { otp, phoneNumber } = req.body;
  const userVerifyOtpResponse = await userAuthService.userVerifyOtpService({
    otp,
    phoneNumber,
  });
  return userVerifyOtpResponse.send(res);
};

export { userRegisterController, userVerifyOtpController };
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
