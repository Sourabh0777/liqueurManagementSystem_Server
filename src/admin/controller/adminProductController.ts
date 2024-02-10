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
const updateProductsController = async (
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
    const { id } = req.params;

    const createdProductData = await adminProductService.updateProductService({
      productId: Number(id),
      UpdateProduct: {
        subCategoryDetailsID,
        productName,
        measureQuantity,
        measureUnit,
        countryOfOrigin,
        ABV,
        enabled,
      },
    });
    return createdProductData.send(res);
  } catch (error) {
    return next(error);
  }
};

const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ProductsData = await adminProductService.getAllProductsService();
    return ProductsData.send(res);
  } catch (error) {
    return next(error);
  }
};
const deleteProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = req.params.id;
  if (!productId) throw new BadRequestError('No ID provided');
  try {
    const deletedProductsData = await adminProductService.deleteProductService(
      Number(productId),
    );
    return deletedProductsData.send(res);
  } catch (error) {
    return next(error);
  }
};
const getProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = req.params.id;
  if (!productId) throw new BadRequestError('No ID provided');
  try {
    const ProductsData = await adminProductService.getProductService(
      Number(productId),
    );
    return ProductsData.send(res);
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
    const categoryData = await adminProductService.getAllCategoriesService();
    return categoryData.send(res);
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
    const categoryId = req.params.id;
    if (!categoryId) {
      throw new BadRequestError('categoryId required');
    }
    const deleteCategoryResponse =
      await adminProductService.deleteCategoryService(Number(categoryId));
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
    const subCategoryData =
      await adminProductService.getAllSubCategoriesService();
    return subCategoryData.send(res);
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
    const subCategoryId = req.params.id;
    if (!subCategoryId) {
      throw new BadRequestError('subCategoryId required');
    }
    const deleteSubCategoryResponse =
      await adminProductService.deleteSubCategoryService(Number(subCategoryId));
    return deleteSubCategoryResponse.send(res);
  } catch (err) {
    console.log('Error deleting Sub-Category:', err);
    next(err);
  }
};

const getCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categoryId = req.params.id;
  if (!categoryId) throw new BadRequestError('No ID provided');
  try {
    const categoryData = await adminProductService.getCategoryService(
      Number(categoryId),
    );
    return categoryData.send(res);
  } catch (error) {
    return next(error);
  }
};

const getSubCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const subCategoryId = req.params.id;
  if (!subCategoryId) throw new BadRequestError('No ID provided');
  try {
    const subCategoryData = await adminProductService.getSubCategoryService(
      Number(subCategoryId),
    );
    return subCategoryData.send(res);
  } catch (error) {
    return next(error);
  }
};

export {
  addCategoryController,
  addSubCategoryController,
  addProductsController,
  getAllCategories,
  getAllSubCategories,
  getAllProductsController,
  getProductController,
  updateProductsController,
  updateCategoryController,
  updateSubCategoryController,
  deleteProductsController,
  deleteCategoryController,
  deleteSubCategoryController,
  getCategoryController,
  getSubCategoryController,
};
