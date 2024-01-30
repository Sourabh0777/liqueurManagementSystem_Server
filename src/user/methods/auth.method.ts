import { Response } from "express";
import prisma_client from "../../config/prisma";
import { SuccessResponse } from "../../core/ApiResponse";
import { userRegistrationInterface } from "../models/user.models";

const RegisterUserMethod = async (userRegistrationData: userRegistrationInterface) => {
  console.log("api run till RegisterUserMethod");
  const registeredUser = await prisma_client.user.create({ data: { ...userRegistrationData } });
  return new SuccessResponse("Signup Successful", {
    registeredUser: registeredUser,
  });
  // return {
  //   success: true,
  //   data: registeredUser,
  //   status: 200,
  //   message: "registration successful",
  // };
};
export { RegisterUserMethod };
