import prisma_client from '../../config/prisma';
import { AuthFailureError } from '../../core/ApiError';
import * as Vendorauthmethods from '../methods/vendorAuth.method';
import {
  vendorRegistrationInterface,
  vendorDetails,
} from '../models/vendor.models';
import bcrypt from 'bcrypt';

const vendorRegisterService = async (
  vendorRegistrationData: vendorRegistrationInterface,
) => {
  const registrationResponse = await Vendorauthmethods.RegisterVendorMethod(
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

const getVendorService = async (getVendor: vendorDetails) => {
  const getVendorResponse = await Vendorauthmethods.fetchVendorMethod(
    getVendor,
  );
  return getVendorResponse;
};

const deleteVendorService = async (adminId: number) => {
  const deleteVendorResponse = await Vendorauthmethods.deleteVendorMethod(
    adminId,
  );
  return deleteVendorResponse;
};

export {
  vendorRegisterService,
  VendorLoginService,
  getVendorService,
  deleteVendorService,
};
