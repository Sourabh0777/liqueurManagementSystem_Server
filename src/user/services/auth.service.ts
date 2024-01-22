import * as authMethods from "../methods/auth.method";
import { userRegistrationInterface } from "../models/user.models";
const userRegisterService = async (userRegistrationData: userRegistrationInterface) => {
  const registrationResponse = await authMethods.RegisterUserMethod(userRegistrationData);
  return registrationResponse;
};

export { userRegisterService };
