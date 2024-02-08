import { Request, Response, NextFunction } from 'express';
import * as adminProductService from '../services/adminProduct.service';
import { BadRequestError } from '../../core/ApiError';
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

export {
  addCategoryController,
  addSubCategoryController,
  addProductsController,
  updateProductsController,
  getAllProductsController,
  deleteProductsController,
  getProductController,
};
