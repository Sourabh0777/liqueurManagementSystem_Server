import * as vendorInventoryMethod from '../methods/vendorInventory.method';
import {
  createInventoryItemInterface,
  inventoryDataInterface,
} from '../models/vendor.models';
const addInventoryItemService = async (
  inventoryDetails: createInventoryItemInterface,
) => {
  const serviceResponse = await vendorInventoryMethod.addInventoryItemMethod(
    inventoryDetails,
  );
  return serviceResponse;
};

const deleteInventoryItemService = async (inventoryItemId: number) => {
  const deletionResponse =
    await vendorInventoryMethod.deleteInventoryItemMethod(inventoryItemId);
  return deletionResponse;
};

const getVendorInventoryService = async (vendorId: number) => {
  const serviceResponse = await vendorInventoryMethod.getVendorInventoryMethod(
    vendorId,
  );
  return serviceResponse;
};

const updateInventoryItemService = async (
  vendorId: number,
  inventoryItemId: number,
  inventoryData: inventoryDataInterface,
) => {
  const updationResponse =
    await vendorInventoryMethod.updateInventoryItemMethod(
      vendorId,
      inventoryItemId,
      inventoryData,
    );
  return updationResponse;
};

export {
  addInventoryItemService,
  deleteInventoryItemService,
  getVendorInventoryService,
  updateInventoryItemService,
};
