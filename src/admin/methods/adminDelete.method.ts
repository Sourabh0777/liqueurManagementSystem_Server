import prisma_client from '../../config/prisma';
import { NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';

const deleteAdminMethod = async (adminId: number) => {
  try {
    const admin = await prisma_client.admin.delete({
      where: { id: adminId },
    });

    if (!admin) {
      throw new NotFoundError('Admin not found');
    }
    return new SuccessResponse('Admin Deleted', { message: 'Successful' });
  } catch (error) {
    console.error('Error while deleting:', error);
    throw error;
  }
};

const deleteUserMethod = async (userId: number) => {
  try {
    const user = await prisma_client.user.delete({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }
    return new SuccessResponse('User Deleted', { message: 'Successful' });
  } catch (error) {
    console.error('Error while deleting:', error);
    throw error;
  }
};

const deleteVendorMethod = async (vendorId: number) => {
  try {
    const vendor = await prisma_client.vendor.delete({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new NotFoundError('Vendor not found');
    }
    return new SuccessResponse('Vendor Deleted', { message: 'Successful' });
  } catch (error) {
    console.error('Error while deleting:', error);
    throw error;
  }
};
export { deleteAdminMethod, deleteUserMethod, deleteVendorMethod };
