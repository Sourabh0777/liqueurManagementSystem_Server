import {
  categoryInterface,
  createProductInterface,
  subCategoryInterface,
  updateProductInterface,
} from '../models/admin.models';
import * as adminProductMethod from '../methods/adminProduct.method';

const addCategoryService = async (
  productCategoryDetails: categoryInterface,
) => {
  const serviceResponse = await adminProductMethod.addCategoryMethod(
    productCategoryDetails,
  );
  return serviceResponse;
};

const addSubCategoryService = async (
  productSubCategoryDetails: subCategoryInterface,
) => {
  const serviceResponse = await adminProductMethod.addSubCategoryMethod(
    productSubCategoryDetails,
  );
  return serviceResponse;
};

const addProductService = async (productDetails: createProductInterface) => {
  const serviceResponse = await adminProductMethod.addProductMethod(
    productDetails,
  );
  return serviceResponse;
};
const updateProductService = async (productDetails: updateProductInterface) => {
  const serviceResponse = await adminProductMethod.updateProductMethod(
    productDetails,
  );
  return serviceResponse;
};
const getAllProductsService = async () => {
  const serviceResponse = await adminProductMethod.getAllProductsMethod();
  return serviceResponse;
};

const deleteProductService = async (id: number) => {
  const serviceResponse = await adminProductMethod.deleteProductMethod(id);
  return serviceResponse;
};
export {
  addCategoryService,
  addSubCategoryService,
  addProductService,
  updateProductService,
  getAllProductsService,
  deleteProductService,
};
