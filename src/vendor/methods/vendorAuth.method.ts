import prisma_client from '../../config/prisma';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
// import generateOtp from "../../user/middlewares/generateOtp";
import {
  vendorDetails,
  vendorRegistrationInterface,
} from '../models/vendor.models';
import bcrypt from 'bcrypt';

const saltRounds = 5;

const RegisterVendorMethod = async (
  vendorRegistrationData: vendorRegistrationInterface,
) => {
  const existingVendor = await prisma_client.vendor.findFirst({
    where: { username: vendorRegistrationData.username },
  });

  if (existingVendor) {
    throw new BadRequestError('Vendor Already existed');
  }

  const hashPassword = await bcrypt.hash(
    vendorRegistrationData.password,
    saltRounds,
  );

  const registeredVendor = await prisma_client.vendor.create({
    data: { ...vendorRegistrationData, password: hashPassword },
  });

  return new SuccessResponse('Vendor Created successfully', {
    username: vendorRegistrationData.username,
  });
};

const LoginVendorMethod = async (
  vendorLoginData: vendorRegistrationInterface,
) => {
  const existingVendor = await prisma_client.vendor.findFirst({
    where: { username: vendorLoginData.username },
  });

  if (!existingVendor) {
    throw new BadRequestError('Vendor does not exist.');
  }

  const passwordMatch = await bcrypt.compare(
    vendorLoginData.password,
    existingVendor.password,
  );

  if (!passwordMatch) {
    throw new BadRequestError('Invalid password.');
  }

  return new SuccessResponse('Login successful', { userId: existingVendor.id });
};

const fetchVendorMethod = async (VendorData: vendorDetails) => {
  const { Id } = VendorData;
  const getVendor = await prisma_client.vendor.findUnique({
    where: {
      id: Id,
    },
  });
  if (!getVendor) {
    throw new NotFoundError('Vendor not Found');
  }
  return new SuccessResponse('Fetched the vendor details', getVendor);
};

const deleteVendorMethod = async (vendorId: number) => {
  try {
    const vendor = await prisma_client.vendor.delete({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new NotFoundError('Vendor not Found');
    }
    return new SuccessResponse('Vendor Deleted', { message: 'Successful' });
  } catch (error) {
    console.error('Error while deleting:', error);
    throw error;
  }
};

export {
  RegisterVendorMethod,
  LoginVendorMethod,
  fetchVendorMethod,
  deleteVendorMethod,
};
