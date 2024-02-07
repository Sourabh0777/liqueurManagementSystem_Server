import { categoryInterface } from '../models/admin.models';
import * as adminProductMethod from '../methods/adminProduct.method';

const addCategoryService = async (
  productCategoryDetails: categoryInterface,
) => {
  const serviceResponse = await adminProductMethod.addCategoryMethod(
    productCategoryDetails,
  );
  return serviceResponse;
};

export { addCategoryService };
