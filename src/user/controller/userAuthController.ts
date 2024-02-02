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
