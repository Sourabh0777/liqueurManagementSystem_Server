import { categoryInterface } from '../models/admin.models';
import * as adminProductMethod from '../methods/adminProduct.method';

const addProductCategoryService = async (
  productCategoryDetails: categoryInterface,
) => {
  const serviceResponse = await adminProductMethod.addProductCategoryMethod(
    productCategoryDetails,
  );
  return serviceResponse;
};

export { addProductCategoryService };
