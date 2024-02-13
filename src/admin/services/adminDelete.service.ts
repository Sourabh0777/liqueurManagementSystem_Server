import * as adminMethods from '../methods/adminDelete.method';

const deleteAdminService = async (adminId: number) => {
  const deletionResponse = await adminMethods.deleteAdminMethod(adminId);
  return deletionResponse;
};

const deleteUserService = async (userId: number) => {
  const deletionResponse = await adminMethods.deleteUserMethod(userId);
  return deletionResponse;
};

const deleteVendorService = async (vendorId: number) => {
  const deletionResponse = await adminMethods.deleteVendorMethod(vendorId);
  return deletionResponse;
};

export { deleteAdminService, deleteUserService, deleteVendorService };
