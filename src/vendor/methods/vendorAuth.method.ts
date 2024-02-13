import prisma_client from '../../config/prisma';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
// import generateOtp from "../../user/middlewares/generateOtp";
import {
  vendorDataInterface,
  vendorRegistrationInterface,
} from '../models/vendor.models';
import bcrypt from 'bcrypt';

const saltRounds = 5;

const registerVendorMethod = async (
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

const loginVendorMethod = async (
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

const getVendorMethod = async (id: number) => {
  const getVendor = await prisma_client.vendor.findUnique({
    where: {
      id: id,
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

const updateVendorMethod = async (newVendorData: vendorDataInterface) => {
  const { decodeToken, ...data } = newVendorData;
  const updatedVendor = await prisma_client.vendor.update({
    where: {
      id: decodeToken.id,
    },
    data: data,
  });

  return new SuccessResponse('Data Changed Successfully', updatedVendor);
};

const updateVendorPasswordMethod = async (
  username: string,
  newPassword: string,
) => {
  try {
    const updatedVendor = await prisma_client.vendor.update({
      where: { username },
      data: { password: newPassword },
    });

    if (!updatedVendor) {
      throw new NotFoundError('Vendor not found');
    }

    return new SuccessResponse('Vendor password Changed!', {
      message: 'Success',
    });
  } catch (error) {
    console.error('Error during Updating:', error);
    throw error;
  }
};
export {
  registerVendorMethod,
  loginVendorMethod,
  getVendorMethod,
  deleteVendorMethod,
  updateVendorMethod,
  updateVendorPasswordMethod,
};
