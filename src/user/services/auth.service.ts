import * as authMethods from '../methods/auth.method';
import {
  userRegistrationInterface,
} from '../models/user.models';
const userRegisterService = async (
  userRegistrationData: userRegistrationInterface,
) => {
  const registrationResponse = await authMethods.RegisterUserMethod(
    userRegistrationData,
  );
  return registrationResponse;
};
const userVerifyOtpService = async (
  userVerifyOtpData: userRegistrationInterface,
) => {
  const registrationResponse = await authMethods.VerifyOtpMethod(
    userVerifyOtpData,
  );
  return registrationResponse;
};

const userLoginService = async (userLoginData: userRegistrationInterface) => {
  const loginResponse = await authMethods.LoginMethod(userLoginData);
  return loginResponse;
};
export { userRegisterService, userVerifyOtpService, userLoginService };
