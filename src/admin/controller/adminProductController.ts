import { Request, Response, NextFunction } from 'express';
import * as adminProductService from '../services/adminProduct.service';
import { BadRequestError } from '../../core/ApiError';
import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
const addCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryName, categoryDetails } = req.body;
    if (!categoryName || !categoryDetails) {
      throw new BadRequestError('Require input all fields.');
    }
    const categoryData = await adminProductService.addCategoryService({
      categoryName,
      categoryDetails,
    });
    return categoryData.send(res);
  } catch (error) {
    return next(error);
  }
};

const addSubCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryDetailsID, subCategoryName, subCategoryDetails } = req.body;
    if (!categoryDetailsID || !subCategoryName || !subCategoryDetails) {
      throw new BadRequestError('Require input all fields.');
    }
    const subCategoryData = await adminProductService.addSubCategoryService({
      categoryDetailsID,
      subCategoryName,
      subCategoryDetails,
    });
    return subCategoryData.send(res);
  } catch (error) {
    return next(error);
  }
};

const addProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      subCategoryDetailsID,
      productName,
      measureQuantity,
      measureUnit,
      countryOfOrigin,
      ABV,
      enabled,
    } = req.body;
    if (!subCategoryDetailsID || !productName || !measureQuantity || !ABV) {
      throw new BadRequestError('Require input all fields.');
    }
    const createdProductData = await adminProductService.addProductService({
      subCategoryDetailsID,
      productName,
      measureQuantity,
      measureUnit,
      countryOfOrigin,
      ABV,
      enabled,
    });
    return createdProductData.send(res);
  } catch (error) {
    return next(error);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await prisma_client.categoryDetail.findMany();
    if (!categories) {
      throw new BadRequestError('No categories Found!');
    }
    const allUsers = new SuccessResponse(
      'Categories Fetched successfully',
      categories,
    );
    return allUsers.send(res);
  } catch (err) {
    return next(err);
  }
};

const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, categoryName, categoryDetails } = req.body;
    const updatedCategory = await adminProductService.updateCategoryService({
      id,
      categoryName,
      categoryDetails,
    });
    return updatedCategory.send(res);
  } catch (error) {
    console.log('Error updating category:', error);
    next(error);
  }
};

const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = req.body.id;
    if (!categoryId) {
      throw new BadRequestError('categoryId required');
    }
    const deleteCategoryResponse =
      await adminProductService.deleteCategoryService(categoryId);
    return deleteCategoryResponse.send(res);
  } catch (err) {
    console.log('Error deleting Category:', err);
    next(err);
  }
};

const getAllSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subCategories = await prisma_client.subCategoryDetail.findMany();
    if (!subCategories) {
      throw new BadRequestError('No sub-categories Found!');
    }
    const allUsers = new SuccessResponse(
      'Sub-Categories Fetched successfully',
      subCategories,
    );
    return allUsers.send(res);
  } catch (err) {
    return next(err);
  }
};

const updateSubCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, categoryDetailsID, subCategoryName, subCategoryDetails } =
      req.body;
    const updatedSubCategory =
      await adminProductService.updateSubCategoryService({
        id,
        categoryDetailsID,
        subCategoryName,
        subCategoryDetails,
      });
    return updatedSubCategory.send(res);
  } catch (error) {
    console.log('Error updating Sub-Category:', error);
    next(error);
  }
};

const deleteSubCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subCategoryId = req.body.id;
    if (!subCategoryId) {
      throw new BadRequestError('subCategoryId required');
    }
    const deleteSubCategoryResponse =
      await adminProductService.deleteSubCategoryService(subCategoryId);
    return deleteSubCategoryResponse.send(res);
  } catch (err) {
    console.log('Error deleting Sub-Category:', err);
    next(err);
  }
};

export {
  addCategoryController,
  addSubCategoryController,
  addProductsController,
  getAllCategories,
  updateCategoryController,
  deleteCategoryController,
  getAllSubCategories,
  updateSubCategoryController,
  deleteSubCategoryController,
};
