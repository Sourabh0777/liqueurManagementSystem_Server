import {
  categoryInterface,
  createProductInterface,
  subCategoryInterface,
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
export { addCategoryService, addSubCategoryService, addProductService };
