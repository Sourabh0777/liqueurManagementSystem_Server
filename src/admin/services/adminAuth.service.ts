// adminAuth.service.ts
import prisma_client from "../../config/prisma";
import { SuccessResponse } from "../../core/ApiResponse";
import { adminRegistrationInterface } from "../models/admin.models";
import { RegisterAdminMethod } from "../methods/adminAuth.method";

const adminAuthService = async (userRegistrationData: adminRegistrationInterface) => {
  const registrationResponse = await RegisterAdminMethod(userRegistrationData);
  return registrationResponse;
};


const getAdminData = async (userId: string) => {
  const adminData = await prisma_client.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!adminData) {
    throw new Error("Admin data not found");
  }

  return new SuccessResponse("Admin data fetched successfully", {
    adminData: adminData,
  });
};

export { adminAuthService, getAdminData };
