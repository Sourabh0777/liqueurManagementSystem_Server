import * as authMethods from "../methods/auth.method";
import { userRegistrationInterface,userDataInterface } from "../models/user.models";
const userRegisterService = async (userRegistrationData: userRegistrationInterface) => {
  const registrationResponse = await authMethods.RegisterUserMethod(userRegistrationData);
  return registrationResponse;
};
const userVerifyOtpService = async (userVerifyOtpData: userRegistrationInterface) => {
  const registrationResponse = await authMethods.VerifyOtpMethod(userVerifyOtpData);
  return registrationResponse;
};

const userDataUpdateService = async (Id:number,newUserData:userDataInterface)=>{
  const dataUpdateResponse= await authMethods.UpdateUserMethod(Id,newUserData);
  return dataUpdateResponse;
}
export { userRegisterService, userVerifyOtpService, userDataUpdateService };
