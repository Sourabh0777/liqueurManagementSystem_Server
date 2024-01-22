import prisma_client from "../../config/prisma";
import { userRegistrationInterface } from "../models/user.models";

const RegisterUserMethod = async (userRegistrationData: userRegistrationInterface) => {
  console.log("working");
  const registeredUser = await prisma_client.user.create({ data: { ...userRegistrationData } });
  console.log("🚀 ~ RegisterUserMethod ~ registeredUser:", registeredUser);
  return {
    success: true,
    data: registeredUser,
    status: 200,
    message: "registration successful",
  };
};
export { RegisterUserMethod };
