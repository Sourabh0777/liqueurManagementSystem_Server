import { Request, Response, NextFunction } from 'express';
import * as vendorInventoryService from '../services/vendorInventory.service';
import { BadRequestError } from '../../core/ApiError';
import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
const createInventoryItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vendorBusinessID = req.body.decodeToken.id;
    const { productDetailsID, productPrice, totalQuantity, availableQuantity } =
      req.body;
    const inventoryData = await vendorInventoryService.addInventoryItemService({
      vendorBusinessID,
      productDetailsID,
      productPrice,
      totalQuantity,
      availableQuantity,
    });
    return inventoryData.send(res);
  } catch (error) {
    return next(error);
  }
};

const deleteInventoryItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const inventoryItemId = req.params.id;
    if (!inventoryItemId) {
      throw new BadRequestError('Inventory Item ID required');
    }
    const deleteInventoryItemResponse =
      await vendorInventoryService.deleteInventoryItemService(
        Number(inventoryItemId),
      );
    return deleteInventoryItemResponse.send(res);
  } catch (err) {
    console.log('Error deleting Inventory-item:', err);
    next(err);
  }
};

const getVendorInventoryService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vendorId = req.body.decodeToken.id;
    const inventoryData =
      await vendorInventoryService.getVendorInventoryService(Number(vendorId));
    return inventoryData.send(res);
  } catch (err) {
    return next(err);
  }
};

const updateInventoryItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vendorId = req.body.decodeToken.id;
    const inventoryItemId = req.params.id;
    const { productDetailsID, productPrice, totalQuantity, availableQuantity } =
      req.body;
    if (!inventoryItemId) {
      throw new BadRequestError('Inventory Item ID required');
    }
    const updateInventoryItemResponse =
      await vendorInventoryService.updateInventoryItemService(
        Number(vendorId),
        Number(inventoryItemId),
        { productDetailsID, productPrice, totalQuantity, availableQuantity },
      );
    return updateInventoryItemResponse.send(res);
  } catch (err) {
    console.log('Error deleting Inventory-item:', err);
    next(err);
  }
};

export {
  createInventoryItemController,
  deleteInventoryItemController,
  getVendorInventoryService,
  updateInventoryItemController,
};
