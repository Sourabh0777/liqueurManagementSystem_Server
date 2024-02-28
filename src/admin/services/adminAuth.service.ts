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

const uploadAdminImageService = async (adminImage: any, adminId: number) => {
  const uploadImageResponse = await adminAuthMethods.uploadAdminImageMethod(
    adminImage,
    adminId,
  );
  return uploadImageResponse;
};

const deleteAdminImageService = async (imagePath: string, adminId: number) => {
  const deleteImageResponse = await adminAuthMethods.deleteAdminImageMethod(
    imagePath,
    adminId,
  );
  return deleteImageResponse;
};

export {
  adminRegisterService,
  adminLoginService,
  uploadAdminImageService,
  deleteAdminImageService,
};
