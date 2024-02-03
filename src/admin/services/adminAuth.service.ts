<<<<<<< HEAD
import * as adminAuthMethods from '../methods/adminAuth.method';
import { adminRegistrationInterface } from '../models/admin.models';
import prisma_client from '../../config/prisma';
import bcrypt from 'bcrypt';
import { BadRequestError, AuthFailureError } from '../../core/ApiError';

const adminRegisterService = async (
  adminRegistrationData: adminRegistrationInterface,
) => {
  const registrationResponse = await adminAuthMethods.RegisterAdminMethod(
    adminRegistrationData,
  );
  return registrationResponse;
};

const adminLoginService = async (username: string, password: string) => {
  const admin = await prisma_client.admin.findUnique({ where: { username } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new AuthFailureError('Invalid username or password');
    return;
  }

  return admin;
};

export { adminRegisterService, adminLoginService };
=======
// adminAuth.service.ts
import prisma_client from "../../config/prisma";
import { SuccessResponse } from "../../core/ApiResponse";
import { adminRegistrationInterface } from "../models/admin.models";
import { RegisterAdminMethod } from "../methods/adminAuth.method";

const adminAuthService = async (userRegistrationData: adminRegistrationInterface) => {
  const registrationResponse = await RegisterAdminMethod(userRegistrationData);
  return registrationResponse;
};


const getAdminData = async (userId: string) => {
  const adminData = await prisma_client.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!adminData) {
    throw new Error("Admin data not found");
  }

  return new SuccessResponse("Admin data fetched successfully", {
    adminData: adminData,
  });
};

export { adminAuthService, getAdminData };
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
