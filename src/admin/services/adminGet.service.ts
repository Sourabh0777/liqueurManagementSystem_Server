import * as adminGetAllMethod from '../methods/adminGet.method';

const getAllUsersService = async () => {
  const serviceResponse = await adminGetAllMethod.getAllUsersMethod();
  return serviceResponse;
};

const getAllVendorsService = async () => {
  const serviceResponse = await adminGetAllMethod.getAllVendorsMethod();
  return serviceResponse;
};

export { getAllUsersService, getAllVendorsService };
