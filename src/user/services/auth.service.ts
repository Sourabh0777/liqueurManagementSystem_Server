import * as authMethods from '../methods/auth.method';
import {
  userRegistrationInterface,
  userDataInterface,
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

const userDataUpdateService = async (newUserData: userDataInterface) => {
  const dataUpdateResponse = await authMethods.UpdateUserMethod(newUserData);
  return dataUpdateResponse;
};

const userLoginService = async (userLoginData: userRegistrationInterface) => {
  const loginResponse = await authMethods.LoginMethod(userLoginData);
  return loginResponse;
};

const getUserService = async (getUser: userDataInterface) => {
  const getUserResponse = await authMethods.getUserMethod(getUser);
  return getUserResponse;
};

const deleteUserService = async (deleteUser: userDataInterface) => {
  const deleteUserResponse = await authMethods.deleteUserMethod(deleteUser);
  return deleteUserResponse;
};

const uploadImageService = async (userImage: any, userId: number) => {
  const uploadImageResponse = await authMethods.uploadImageMethod(
    userImage,
    userId,
  );
  return uploadImageResponse;
};

const deleteImageService = async (imagePath: string, userId: number) => {
  const deleteImageResponse = await authMethods.deleteUserImageMethod(
    imagePath,
    userId,
  );
  return deleteImageResponse;
};
export {
  userRegisterService,
  userVerifyOtpService,
  userLoginService,
  userDataUpdateService,
  getUserService,
  deleteUserService,
  uploadImageService,
  deleteImageService,
};
