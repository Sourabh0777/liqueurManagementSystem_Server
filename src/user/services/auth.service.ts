<<<<<<< HEAD
import * as authMethods from '../methods/auth.method';
import {
  userRegistrationInterface,userDataInterface
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


const userDataUpdateService = async (newUserData:userDataInterface)=>{
  const dataUpdateResponse= await authMethods.UpdateUserMethod(newUserData);
  return dataUpdateResponse;
}

const userLoginService = async (userLoginData: userRegistrationInterface) => {
  const loginResponse = await authMethods.LoginMethod(userLoginData);
  return loginResponse;
};
<<<<<<< HEAD
export { userRegisterService, userVerifyOtpService, userLoginService };
=======
import * as authMethods from "../methods/auth.method";
import { userRegistrationInterface } from "../models/user.models";
const userRegisterService = async (userRegistrationData: userRegistrationInterface) => {
  const registrationResponse = await authMethods.RegisterUserMethod(userRegistrationData);
  return registrationResponse;
};
const userVerifyOtpService = async (userVerifyOtpData: userRegistrationInterface) => {
  const registrationResponse = await authMethods.VerifyOtpMethod(userVerifyOtpData);
  return registrationResponse;
};

export { userRegisterService, userVerifyOtpService };
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
=======

const getUserService =async (getUser : userDataInterface)=>{
  const getUserResponse= await authMethods.getUserMethod(getUser);
  return getUserResponse
}

const deleteUserService =async (deleteUser : userDataInterface)=>{
  const deleteUserResponse= await authMethods.deleteUserMethod(deleteUser);
  return deleteUserResponse;
}
export { userRegisterService, userVerifyOtpService, userLoginService,userDataUpdateService, getUserService, deleteUserService};
>>>>>>> b77e216d91bd6c1328849815beb9469289ee93a3
