import { Request, Response } from "express";
import * as userAuthService from "../services/auth.service";
const userRegisterController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userRegistrationResponse = await userAuthService.userRegisterService({
    name,
    email,
    password,
  });
  return userRegistrationResponse.send(res);
};

export { userRegisterController };
