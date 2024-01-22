import { Request, Response } from "express";
import * as userAuthService from "../services/auth.service";
const userRegisterController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log("🚀 ~ name, email, password:", name, email, password);
  const userRegistrationResponse = await userAuthService.userRegisterService({
    name,
    email,
    password,
  });
  return res.json(userRegistrationResponse);
};

export { userRegisterController };
