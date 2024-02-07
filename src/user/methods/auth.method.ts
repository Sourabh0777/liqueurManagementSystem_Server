<<<<<<< HEAD
<<<<<<< HEAD
import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
import { userRegistrationInterface } from '../models/user.models';
import { BadRequestError } from '../../core/ApiError';
import generateOtp from '../middlewares/generateOtp';
=======
import prisma_client from "../../config/prisma";
import { SuccessResponse } from "../../core/ApiResponse";
import { userRegistrationInterface,userDataInterface } from "../models/user.models";
import { BadRequestError, NotFoundError } from "../../core/ApiError";
import generateOtp from "../middlewares/generateOtp";

>>>>>>> b77e216d91bd6c1328849815beb9469289ee93a3

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
=======
import prisma_client from "../../config/prisma";
import { SuccessResponse } from "../../core/ApiResponse";
import { userRegistrationInterface } from "../models/user.models";
import { BadRequestError } from "../../core/ApiError";
import generateOtp from "../middlewares/generateOtp";

const RegisterUserMethod = async (userRegistrationData: userRegistrationInterface) => {
  const existingUser = await prisma_client.user.findFirst({
    where: { phoneNumber: userRegistrationData.phoneNumber },
  });
  if (existingUser) {
    throw new BadRequestError("User not registered");
  }
  const { otp, otpExpiry } = await generateOtp(userRegistrationData.phoneNumber);
  userRegistrationData.otp = otp;
  userRegistrationData.otpExpiry = otpExpiry;

  const registeredUser = await prisma_client.user.create({ data: { ...userRegistrationData } });

  return new SuccessResponse("OTP sent successfully", {
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
    phoneNumber: userRegistrationData.phoneNumber,
    otpExpiry: userRegistrationData.otpExpiry,
  });
};
<<<<<<< HEAD
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

<<<<<<< HEAD
export { RegisterUserMethod, VerifyOtpMethod, LoginMethod };
=======
const VerifyOtpMethod = async (userVerifyOtpData: userRegistrationInterface) => {
  try {
    const user = await prisma_client.user.findFirst({
      where: {
        phoneNumber: userVerifyOtpData.phoneNumber,
        otp: userVerifyOtpData.otp,
      },
    });
    if (!user || !user.otpExpiry || new Date(user.otpExpiry) < new Date()) {
      throw new BadRequestError("Invalid OTP");
    }
    await prisma_client.user.update({
      where: { id: user.id },
      data: { isOTPVerified: true },
    });
    return new SuccessResponse("OTP verified successfully", { message: "working" });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    throw error;
  }
};
export { RegisterUserMethod, VerifyOtpMethod };
// safsf
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
=======

const UpdateUserMethod = async (newUserData:userDataInterface)=>{

    const {Id,...data}=newUserData;
    const updateUser= await prisma_client.user.update({
      where:{
        id:Id,
      },
        data:data
      })
 
    return new SuccessResponse("Data Changed Successfully",updateUser)
  
}

const getUserMethod = async (userData:userDataInterface)=>{

  const {Id}=userData;
  const getUser = await prisma_client.user.findUnique({
    where:{
      id:Id,
    }
  })
  if(!getUser){
    throw new NotFoundError("User not Found");
  }
  return new SuccessResponse("Fetched User Details",getUser);
}

const deleteUserMethod = async (userData:userDataInterface)=>{

  const{Id}=userData;
  const deleteUser= await prisma_client.user.delete({
    where:{
      id:Id,
  }
})
if(!deleteUser){
  throw new NotFoundError("User not Found");
}
return new SuccessResponse("User Deleted Successfully",deleteUser);

}

export { RegisterUserMethod, VerifyOtpMethod, LoginMethod, UpdateUserMethod, getUserMethod, deleteUserMethod} ;

>>>>>>> b77e216d91bd6c1328849815beb9469289ee93a3
