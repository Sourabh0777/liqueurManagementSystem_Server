import prisma_client from '../../config/prisma';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';

const getAllUsersMethod = async () => {
  const allUsers = await prisma_client.user.findMany();
  if (!allUsers) {
    throw new BadRequestError('No Users found.');
  }
  return new SuccessResponse('Fetched All Users.', {
    allUsers: allUsers,
  });
};

const getAllVendorsMethod = async () => {
  const allVendors = await prisma_client.vendor.findMany();
  if (!allVendors) {
    throw new BadRequestError('No Vendors found.');
  }
  return new SuccessResponse('Fetched All Vendors.', {
    allVendors: allVendors,
  });
};

export { getAllUsersMethod, getAllVendorsMethod };
