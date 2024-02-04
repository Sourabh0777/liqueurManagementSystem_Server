import prisma_client from '../../config/prisma';
import bcrypt from 'bcrypt';
import {
  updateAdminPasswordMethod,
  updateAdminDetailsMethod,
} from '../methods/adminUpdateDetails.method';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { adminDetails } from '../models/admin.models';

const updateAdminPasswordService = async (
  username: string,
  currentPassword: string,
  newPassword: string,
) => {
  const admin = await prisma_client.admin.findUnique({ where: { username } });

  if (!admin || !(await bcrypt.compare(currentPassword, admin.password))) {
    throw new NotFoundError('Admin not found or incorrect current password');
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedAdmin = await updateAdminPasswordMethod(
    username,
    hashedNewPassword,
  );

  return updatedAdmin;
};

const updateAdminDetailsService = async (updatedAdmin: adminDetails) => {
  const admin = await updateAdminDetailsMethod(updatedAdmin);

  return admin;
};

export { updateAdminPasswordService, updateAdminDetailsService };
