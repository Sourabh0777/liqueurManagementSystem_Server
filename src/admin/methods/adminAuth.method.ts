import { Response } from 'express';
import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
import { adminRegistrationInterface } from '../models/admin.models';
import { BadRequestError } from '../../core/ApiError';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const RegisterAdminMethod = async (
  adminRegistrationData: adminRegistrationInterface,
) => {
  const existingAdmin = await prisma_client.admin.findFirst({
    where: { username: adminRegistrationData.username },
  });
  if (existingAdmin) {
    throw new BadRequestError('Admin not registered: Username Already Taken');
  }
  const hashedPassword = await bcrypt.hash(
    adminRegistrationData.password,
    saltRounds,
  );
  const registeredAdmin = await prisma_client.admin.create({
    data: {
      ...adminRegistrationData,
      password: hashedPassword,
      roleType: 'admin',
    },
  });
  return new SuccessResponse('Signup Successful', {
    username: registeredAdmin.username,
  });
};
export { RegisterAdminMethod };
