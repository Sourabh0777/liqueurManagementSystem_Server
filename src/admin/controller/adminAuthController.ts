import { Request, Response } from "express";
import * as adminAuthService from "../services/adminAuth.service";
const adminRegisterController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userRegistrationResponse = await adminAuthService.adminRegisterService({
    name,
    email,
    password,
  });
  return userRegistrationResponse.send(res);
};

export { adminRegisterController };
