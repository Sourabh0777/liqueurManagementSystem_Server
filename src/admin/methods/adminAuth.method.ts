import { Response } from "express";
import prisma_client from "../../config/prisma";
import { SuccessResponse } from "../../core/ApiResponse";
import { adminRegistrationInterface } from "../models/admin.models";

const RegisterAdminMethod = async (userRegistrationData: adminRegistrationInterface) => {
  const registeredUser = await prisma_client.user.create({ data: { ...userRegistrationData } });
  return new SuccessResponse("Signup Successful", {
    registeredUser: registeredUser,
  });
};
export { RegisterAdminMethod };
