import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
import {
  userRegistrationInterface,
  userDataInterface,
} from '../models/user.models';
import {
  BadRequestError,
  NotFoundError,
  InternalError,
} from '../../core/ApiError';
import generateOtp from '../middlewares/generateOtp';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const RegisterUserMethod = async (
  userRegistrationData: userRegistrationInterface,
) => {
  const existingUser = await prisma_client.user.findFirst({
    where: { phoneNumber: userRegistrationData.phoneNumber },
  });

  if (existingUser) {
    throw new BadRequestError('User already registered.');
  }

  const { otp, otpExpiry } = await generateOtp(
    userRegistrationData.phoneNumber,
  );
  userRegistrationData.otp = otp;
  userRegistrationData.otpExpiry = otpExpiry;

  const registeredUser = await prisma_client.user.create({
    data: { ...userRegistrationData },
  });

  return new SuccessResponse('OTP sent successfully', {
    phoneNumber: userRegistrationData.phoneNumber,
    otpExpiry: userRegistrationData.otpExpiry,
  });
};

const VerifyOtpMethod = async (
  userVerifyOtpData: userRegistrationInterface,
) => {
  const user = await prisma_client.user.findFirst({
    where: {
      phoneNumber: userVerifyOtpData.phoneNumber,
      otp: userVerifyOtpData.otp,
    },
  });
  if (!user || !user.otpExpiry || new Date(user.otpExpiry) < new Date()) {
    throw new BadRequestError('Invalid OTP');
  }
  const updatedUser = await prisma_client.user.update({
    where: { id: user.id },
    data: { isOTPVerified: true },
  });
  if (updatedUser) {
    return updatedUser;
  }
};

const LoginMethod = async (userLoginData: userRegistrationInterface) => {
  const existingUser = await prisma_client.user.findFirst({
    where: { phoneNumber: userLoginData.phoneNumber },
  });
  if (!existingUser) {
    throw new BadRequestError('No user Exists.');
  }
  const { otp, otpExpiry } = await generateOtp(userLoginData.phoneNumber);
  await prisma_client.user.update({
    where: { phoneNumber: userLoginData.phoneNumber },
    data: {
      otp: otp,
      otpExpiry: otpExpiry,
    },
  });
  return new SuccessResponse('OTP sent successfully', {
    phoneNumber: userLoginData.phoneNumber,
    otpExpiry: otpExpiry,
  });
};

const UpdateUserMethod = async (newUserData: userDataInterface) => {
  const { decodeToken, ...data } = newUserData;
  const updateUser = await prisma_client.user.update({
    where: {
      id: decodeToken.id,
    },
    data: data,
  });

  return new SuccessResponse('Data Changed Successfully', updateUser);
};

const getUserMethod = async (userData: userDataInterface) => {
  const { decodeToken, ...data } = userData;
  const getUser = await prisma_client.user.findUnique({
    where: {
      id: decodeToken.id,
    },
  });
  if (!getUser) {
    throw new NotFoundError('User not Found');
  }
  return new SuccessResponse('Fetched User Details', getUser);
};

const deleteUserMethod = async (userData: userDataInterface) => {
  const { decodeToken, ...data } = userData;
  const deleteUser = await prisma_client.user.delete({
    where: {
      id: decodeToken.id,
    },
  });
  if (!deleteUser) {
    throw new NotFoundError('User not Found');
  }
  return new SuccessResponse('User Deleted Successfully', deleteUser);
};

const uploadImageMethod = async (userImage: any, userId: number) => {
  const uploadDirectory = path.resolve(
    __dirname,
    '../../../public/images/user',
  );

  const user = await prisma_client.user.findUnique({
    where: {
      id: userId,
    },
  });

  // Check if user exists
  if (!user) {
    throw new NotFoundError("User doesn't Exsist");
  }

  const fileName = uuidv4() + path.extname(userImage.name);
  const uploadPath = path.join(uploadDirectory, fileName);

  // Assign the fileName to the userImage property if user exists
  const updatedUser = await prisma_client.user.update({
    where: {
      id: userId,
    },
    data: {
      userImage: fileName,
    },
  });
  userImage.mv(uploadPath);
  return new SuccessResponse('User Image Uploaded', updatedUser);
};

const deleteUserImageMethod = async (userId: number) => {
  var imagePath = '';
  const imgPath = await prisma_client.user.findUnique({
    where: { id: userId },
    select: { userImage: true },
  });
  if (imgPath?.userImage) {
    imagePath = imgPath.userImage;
  }
  const decodedImagePath = decodeURIComponent(imagePath);

  const uploadDirectory = path.resolve(
    __dirname,
    '../../../public/images/user',
  );
  const finalPath = path.join(uploadDirectory, decodedImagePath);

  try {
    await fs.unlink(finalPath);
  } catch (error) {
    throw new NotFoundError("Image doesn't exist");
  }

  const deleteImage = await prisma_client.user.update({
    where: {
      id: userId,
    },
    data: {
      userImage: null,
    },
  });

  return new SuccessResponse('User Image Removed Successfully', deleteImage);
};

export {
  RegisterUserMethod,
  VerifyOtpMethod,
  LoginMethod,
  UpdateUserMethod,
  getUserMethod,
  deleteUserMethod,
  uploadImageMethod,
  deleteUserImageMethod,
};
