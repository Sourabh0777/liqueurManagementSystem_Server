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

export { deleteAdminMethod };
