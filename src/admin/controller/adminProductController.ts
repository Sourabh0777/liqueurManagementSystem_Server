import { Request, Response, NextFunction } from 'express';
import * as adminProductService from '../services/adminProduct.service';
const addCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryName, categoryDetails } = req.body;
    const categoryData = await adminProductService.addCategoryService({
      categoryName,
      categoryDetails,
    });
    return categoryData.send(res);
  } catch (error) {
    return next(error);
  }
};

export { addCategoryController };
