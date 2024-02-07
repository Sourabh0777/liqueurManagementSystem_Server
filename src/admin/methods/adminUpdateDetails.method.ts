import prisma_client from '../../config/prisma';
import { NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import { adminDetails } from '../models/admin.models';

const updateAdminPasswordMethod = async (
  username: string,
  newPassword: string,
) => {
  try {
    const updatedAdmin = await prisma_client.admin.update({
      where: { username },
      data: { password: newPassword },
    });

    if (!updatedAdmin) {
      throw new NotFoundError('Admin not found');
    }

    return new SuccessResponse('Admin password Changed!', {
      message: 'Success',
    });
  } catch (error) {
    console.error('Error during Updating:', error);
    throw error;
  }
};

const updateAdminDetailsMethod = async (updatedAdmin: adminDetails) => {
  try {
    const { decodeToken, ...data } = updatedAdmin;

    const admin = await prisma_client.admin.update({
      where: { id: decodeToken.id },
      data,
    });

    if (!admin) {
      throw new NotFoundError('Admin not found');
    }

    return new SuccessResponse('Admin details Updated', { UpdatedData: data });
  } catch (error) {
    console.error('Error while updating details:', error);
    throw error;
  }
};

export { updateAdminPasswordMethod, updateAdminDetailsMethod };
