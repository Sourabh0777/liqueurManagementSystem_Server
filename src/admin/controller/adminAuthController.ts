<<<<<<< HEAD
import { NextFunction, Request, Response } from 'express';
import * as adminAuthService from '../services/adminAuth.service';
import { AuthFailureError } from '../../core/ApiError';
import { generateToken } from '../middleware/jwt.middleware';
import bcrypt from 'bcrypt';

const adminRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, emailAddress, username, password } = req.body;
    const userRegistrationResponse =
      await adminAuthService.adminRegisterService({
        firstName,
        lastName,
        emailAddress,
        username,
        password,
      });
    return userRegistrationResponse.send(res);
  } catch (error) {
    console.log('🚀 ~ adminRegisterController ~ error:', error);
    next(error);
  }
};

const adminLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    const admin = await adminAuthService.adminLoginService(username, password);

    if (!admin) {
      new AuthFailureError('Invalid username or password');
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    const token = generateToken({
      username: admin.username,
      firstName: admin.firstName,
      lastName: admin.lastName,
    });

    res
      .cookie('jwtToken', token, { httpOnly: true })
      .json({ message: 'Login successful', admin });
  } catch (error) {
    console.log('🚀 ~ adminLoginController ~ error:', error);
    next(error);
  }
};
export { adminRegisterController, adminLoginController };
=======
import { Request, Response } from "express";
import * as adminAuthService from "../services/adminAuth.service";
const adminRegisterController = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const userRegistrationResponse = await adminAuthService.adminAuthService({
    phoneNumber
  });
  return userRegistrationResponse.send(res);
};

export { adminRegisterController };
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
