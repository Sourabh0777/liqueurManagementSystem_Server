import * as adminMethods from '../methods/adminDelete.method';

const deleteAdminService = async (adminId: number) => {
  const deletionResponse = await adminMethods.deleteAdminMethod(adminId);
  return deletionResponse;
};

export { deleteAdminService };
