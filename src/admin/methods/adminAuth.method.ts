<<<<<<< HEAD
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
    },
  });
  return new SuccessResponse('Signup Successful', {
<<<<<<< HEAD
    registeredAdmin: registeredAdmin,
=======
import { Response } from "express";
import prisma_client from "../../config/prisma";
import { SuccessResponse } from "../../core/ApiResponse";
import { adminRegistrationInterface } from "../models/admin.models";

const RegisterAdminMethod = async (userRegistrationData: adminRegistrationInterface) => {
  const registeredUser = await prisma_client.user.create({ data: { ...userRegistrationData } });
  return new SuccessResponse("Signup Successful", {
    registeredUser: registeredUser,
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
=======
    username: registeredAdmin.username,
>>>>>>> b77e216d91bd6c1328849815beb9469289ee93a3
  });
};
export { RegisterAdminMethod };
