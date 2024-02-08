import {
  createCategoryInterface,
  createProductInterface,
  createSubCategoryInterface,
  categoryInterface,
  subCategoryInterface,
} from '../models/admin.models';
import * as adminProductMethod from '../methods/adminProduct.method';

const addCategoryService = async (
  productCategoryDetails: createCategoryInterface,
) => {
  const serviceResponse = await adminProductMethod.addCategoryMethod(
    productCategoryDetails,
  );
  return serviceResponse;
};

const addSubCategoryService = async (
  productSubCategoryDetails: createSubCategoryInterface,
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

const updateCategoryService = async (updatedCategory: categoryInterface) => {
  const category = await adminProductMethod.updateCategoryMethod(
    updatedCategory,
  );

  return category;
};
const deleteCategoryService = async (categoryId: number) => {
  const deletionResponse = await adminProductMethod.deleteCategoryMethod(
    categoryId,
  );
  return deletionResponse;
};

const updateSubCategoryService = async (
  updatedSubCategory: subCategoryInterface,
) => {
  const subCategory = await adminProductMethod.updateSubCategoryMethod(
    updatedSubCategory,
  );

  return subCategory;
};

const deleteSubCategoryService = async (subCategoryId: number) => {
  const deletionResponse = await adminProductMethod.deleteSubCategoryMethod(
    subCategoryId,
  );
  return deletionResponse;
};

export {
  addCategoryService,
  addSubCategoryService,
  addProductService,
  updateCategoryService,
  deleteCategoryService,
  updateSubCategoryService,
  deleteSubCategoryService,
};
