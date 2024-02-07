import { Request, Response, NextFunction } from 'express';
import * as adminProductService from '../services/adminProduct.service';
const addProductCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryName = req.body;
    const categoryData = await adminProductService.addProductCategoryService({
      categoryName,
    });
    return categoryData.send(res);
  } catch (error) {
    return next(error);
  }
};

export { addProductCategoryController };
