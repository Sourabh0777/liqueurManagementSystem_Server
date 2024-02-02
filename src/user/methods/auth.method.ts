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
    phoneNumber: userRegistrationData.phoneNumber,
    otpExpiry: userRegistrationData.otpExpiry,
  });
};
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