import prisma_client from '../../config/prisma';
import {
  categoryInterface,
  createCategoryInterface,
  createProductInterface,
  createSubCategoryInterface,
  subCategoryInterface,
  updateProductInterface,
} from '../models/admin.models';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';

const addCategoryMethod = async (
  productCategoryDetails: createCategoryInterface,
) => {
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
  productSubCategoryDetails: createSubCategoryInterface,
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
  const addProduct = await prisma_client.productDetail.create({
    data: { ...productDetails },
  });
  return new SuccessResponse('Product Added', {
    addedProduct: addProduct,
  });
};
const updateProductMethod = async (productDetails: updateProductInterface) => {
  const existingProduct = await prisma_client.productDetail.findUnique({
    where: { id: productDetails.productId },
  });
  if (!existingProduct) {
    throw new BadRequestError('Product not found');
  }
  const updatedProduct = await prisma_client.productDetail.update({
    where: { id: productDetails.productId },
    data: {
      ...productDetails.UpdateProduct,
    },
  });
  return new SuccessResponse('Product updated', {
    updatedProduct: updatedProduct,
  });
};

const getAllProductsMethod = async () => {
  const allProducts = await prisma_client.productDetail.findMany();
  if (!allProducts) {
    throw new BadRequestError('No products found.');
  }
  return new SuccessResponse('Fetched All products.', {
    allProducts: allProducts,
  });
};
const deleteProductMethod = async (id: number) => {
  const existingProduct = await prisma_client.productDetail.findUnique({
    where: { id: id },
  });
  if (!existingProduct) {
    throw new BadRequestError('No products found.');
  }
  const deletedProduct = await prisma_client.productDetail.delete({
    where: { id: id },
  });

  return new SuccessResponse('Product deleted', {
    deletedProduct,
  });
};

const getProductMethod = async (id: number) => {
  const existingProduct = await prisma_client.productDetail.findUnique({
    where: { id: id },
  });
  if (!existingProduct) {
    throw new BadRequestError('No products found.');
  }
  return new SuccessResponse('Fetched Product', {
    existingProduct,
  });
};

const updateCategoryMethod = async (updatedCategory: categoryInterface) => {
  try {
    const { ...data } = updatedCategory;

    const category = await prisma_client.categoryDetail.update({
      where: { id: updatedCategory.id },
      data,
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return new SuccessResponse('Category details Updated', {
      UpdatedData: data,
    });
  } catch (error) {
    console.error('Error while updating details:', error);
    throw error;
  }
};

const deleteCategoryMethod = async (categoryId: number) => {
  try {
    const category = await prisma_client.categoryDetail.delete({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }
    return new SuccessResponse('Category Deleted', { message: 'Successful' });
  } catch (error) {
    console.error('Error while deleting:', error);
    throw error;
  }
};

const updateSubCategoryMethod = async (
  updatedSubCategory: subCategoryInterface,
) => {
  try {
    const { ...data } = updatedSubCategory;

    const category = await prisma_client.subCategoryDetail.update({
      where: { id: updatedSubCategory.id },
      data,
    });

    if (!category) {
      throw new NotFoundError('Sub-Category not found');
    }

    return new SuccessResponse('Sub-Category details Updated', {
      UpdatedData: data,
    });
  } catch (error) {
    console.error('Error while updating details:', error);
    throw error;
  }
};

const deleteSubCategoryMethod = async (subCategoryId: number) => {
  try {
    const subCategory = await prisma_client.subCategoryDetail.delete({
      where: { id: subCategoryId },
    });

    if (!subCategory) {
      throw new NotFoundError('Sub-Category not found');
    }
    return new SuccessResponse('Sub-Category Deleted', {
      message: 'Successful',
    });
  } catch (error) {
    console.error('Error while deleting:', error);
    throw error;
  }
};

export {
  addCategoryMethod,
  addSubCategoryMethod,
  addProductMethod,
  updateCategoryMethod,
  deleteCategoryMethod,
  updateSubCategoryMethod,
  deleteSubCategoryMethod,
  updateProductMethod,
  getAllProductsMethod,
  deleteProductMethod,
  getProductMethod,
};
