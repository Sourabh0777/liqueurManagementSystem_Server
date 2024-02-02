import { Request, Response } from "express";
import * as adminAuthService from "../services/adminAuth.service";
const adminRegisterController = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const userRegistrationResponse = await adminAuthService.adminRegisterService({
    phoneNumber
  });
  return userRegistrationResponse.send(res);
};

export { adminRegisterController };
