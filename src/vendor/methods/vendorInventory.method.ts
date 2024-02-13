import prisma_client from '../../config/prisma';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import {
  createInventoryItemInterface,
  inventoryDataInterface,
} from '../models/vendor.models';
const addInventoryItemMethod = async (
  inventoryDetails: createInventoryItemInterface,
) => {
  const existingInventory = await prisma_client.inventory.findFirst({
    where: {
      vendorBusinessID: inventoryDetails.vendorBusinessID,
      productDetailsID: inventoryDetails.productDetailsID,
    },
  });

  if (existingInventory) {
    throw new BadRequestError('Item already registered.');
  }
  const addedItem = await prisma_client.inventory.create({
    data: { ...inventoryDetails },
  });

  return new SuccessResponse('Inventory Item Added', {
    inventoryName: addedItem,
  });
};

const deleteInventoryItemMethod = async (inventoryItemId: number) => {
  try {
    const item = await prisma_client.inventory.delete({
      where: { id: inventoryItemId },
    });

    if (!item) {
      throw new NotFoundError('Inventory-item not found');
    }
    return new SuccessResponse('Inventory-item Deleted', {
      message: 'Successful',
    });
  } catch (error) {
    console.error('Error while deleting:', error);
    throw error;
  }
};

const getVendorInventoryMethod = async (vendorId: number) => {
  const vendorInventory = await prisma_client.inventory.findMany({
    where: { vendorBusinessID: vendorId },
  });
  if (!vendorInventory) {
    throw new BadRequestError('No Items Found.');
  }
  return new SuccessResponse('Fetched all Items.', {
    vendorInventory: vendorInventory,
  });
};

const updateInventoryItemMethod = async (
  vendorId: number,
  inventoryItemId: number,
  inventoryData: inventoryDataInterface,
) => {
  try {
    const item = await prisma_client.inventory.update({
      where: { id: inventoryItemId, vendorBusinessID: vendorId },
      data: { ...inventoryData },
    });

    if (!item) {
      throw new NotFoundError('Inventory-item not found');
    }
    return new SuccessResponse('Inventory-item updated', {
      message: 'Successful',
      item,
    });
  } catch (error) {
    console.error('Error while deleting:', error);
    throw error;
  }
};
export {
  addInventoryItemMethod,
  deleteInventoryItemMethod,
  getVendorInventoryMethod,
  updateInventoryItemMethod,
};
