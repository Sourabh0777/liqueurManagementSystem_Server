import prisma_client from '../../config/prisma';
import { AuthFailureError } from '../../core/ApiError';
import * as vendorAuthMethods from '../methods/vendorAuth.method';
import { NotFoundError } from '../../core/ApiError';
import {
  vendorRegistrationInterface,
  vendorDataInterface,
} from '../models/vendor.models';
import bcrypt from 'bcrypt';

const vendorRegisterService = async (
  vendorRegistrationData: vendorRegistrationInterface,
) => {
  const registrationResponse = await vendorAuthMethods.registerVendorMethod(
    vendorRegistrationData,
  );

  return registrationResponse;
};

const VendorLoginService = async (username: string, password: string) => {
  const vendor = await prisma_client.vendor.findUnique({
    where: { username },
  });

  if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
    throw new AuthFailureError('Invalid Credentials');
    return;
  }
  return vendor;
};

const getVendorService = async (vendorId: number) => {
  const getVendorResponse = await vendorAuthMethods.getVendorMethod(vendorId);
  return getVendorResponse;
};

const deleteVendorService = async (vendorId: number) => {
  const deleteVendorResponse = await vendorAuthMethods.deleteVendorMethod(
    vendorId,
  );
  return deleteVendorResponse;
};

const vendorDataUpdateService = async (newVendorData: vendorDataInterface) => {
  const dataUpdateResponse = await vendorAuthMethods.updateVendorMethod(
    newVendorData,
  );
  return dataUpdateResponse;
};

const updateVendorPasswordService = async (
  vendorId: number,
  username: string,
  currentPassword: string,
  newPassword: string,
) => {
  const vendor = await prisma_client.vendor.findUnique({
    where: { username, id: vendorId },
  });

  if (!vendor || !(await bcrypt.compare(currentPassword, vendor.password))) {
    throw new NotFoundError('Invalid Vendor or incorrect current password');
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedAdmin = await vendorAuthMethods.updateVendorPasswordMethod(
    username,
    hashedNewPassword,
  );

  return updatedAdmin;
};
export {
  vendorRegisterService,
  VendorLoginService,
  getVendorService,
  deleteVendorService,
  vendorDataUpdateService,
  updateVendorPasswordService,
};
