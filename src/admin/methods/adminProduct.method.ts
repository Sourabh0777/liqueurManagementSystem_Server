import prisma_client from '../../config/prisma';
import {
  categoryInterface,
  createProductInterface,
  subCategoryInterface,
} from '../models/admin.models';
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

const addSubCategoryMethod = async (
  productSubCategoryDetails: subCategoryInterface,
) => {
  const existingSubCategory = await prisma_client.subCategoryDetail.findFirst({
    where: { subCategoryName: productSubCategoryDetails.subCategoryName },
  });

  if (existingSubCategory) {
    throw new BadRequestError('Category already registered.');
  }
  const addedSubCategory = await prisma_client.subCategoryDetail.create({
    data: { ...productSubCategoryDetails },
  });

  return new SuccessResponse('Sub-Category Added', {
    subCategoryName: addedSubCategory,
  });
};
const addProductMethod = async (productDetails: createProductInterface) => {
  const addedSubCategory = await prisma_client.productDetail.create({
    data: { ...productDetails },
  });
  return new SuccessResponse('Product Added', {
    subCategoryName: addedSubCategory,
  });
};

export { addCategoryMethod, addSubCategoryMethod, addProductMethod };
