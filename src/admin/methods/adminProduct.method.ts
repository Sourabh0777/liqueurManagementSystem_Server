import prisma_client from '../../config/prisma';
import { categoryInterface } from '../models/admin.models';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';

const addCategoryMethod = async (productCategoryDetails: categoryInterface) => {
  const existingCategory = await prisma_client.categoryDetail.findFirst({
    where: { categoryName: productCategoryDetails.categoryName },
  });

  if (existingCategory) {
    throw new BadRequestError('Category already registered.');
  }
  const addedCategory = await prisma_client.categoryDetail.create({
    data: { ...productCategoryDetails },
  });

  return new SuccessResponse('Category Added', {
    categoryName: addedCategory,
  });
};

export { addCategoryMethod };
