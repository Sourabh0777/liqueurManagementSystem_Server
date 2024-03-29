import {
  createCategoryInterface,
  createProductInterface,
  createSubCategoryInterface,
  categoryInterface,
  subCategoryInterface,
  updateProductInterface,
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
const getProductService = async (id: number) => {
  const serviceResponse = await adminProductMethod.getProductMethod(id);
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

const getCategoryService = async (id: number) => {
  const serviceResponse = await adminProductMethod.getCategoryMethod(id);
  return serviceResponse;
};

const getSubCategoryService = async (id: number) => {
  const serviceResponse = await adminProductMethod.getSubCategoryMethod(id);
  return serviceResponse;
};

const getAllCategoriesService = async () => {
  const serviceResponse = await adminProductMethod.getAllCategoriesMethod();
  return serviceResponse;
};

const getAllSubCategoriesService = async () => {
  const serviceResponse = await adminProductMethod.getAllSubCategoriesMethod();
  return serviceResponse;
};
export {
  addCategoryService,
  addSubCategoryService,
  addProductService,
  updateCategoryService,
  deleteCategoryService,
  updateSubCategoryService,
  deleteSubCategoryService,
  updateProductService,
  getAllProductsService,
  deleteProductService,
  getProductService,
  getCategoryService,
  getSubCategoryService,
  getAllCategoriesService,
  getAllSubCategoriesService,
};
