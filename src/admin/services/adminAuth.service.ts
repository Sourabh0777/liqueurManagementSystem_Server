import * as adminAuthMethods from "../methods/adminAuth.method";
import { adminRegistrationInterface } from "../models/admin.models";
const adminRegisterService = async (userRegistrationData: adminRegistrationInterface) => {
  const registrationResponse = await adminAuthMethods.RegisterAdminMethod(userRegistrationData);
  return registrationResponse;
};

export { adminRegisterService };
