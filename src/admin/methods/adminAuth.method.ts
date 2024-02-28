import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
import { adminRegistrationInterface } from '../models/admin.models';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import bcrypt from 'bcrypt';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';

const saltRounds = 10;

const RegisterAdminMethod = async (
  adminRegistrationData: adminRegistrationInterface,
) => {
  const existingAdmin = await prisma_client.admin.findFirst({
    where: { username: adminRegistrationData.username },
  });
  if (existingAdmin) {
    throw new BadRequestError('Admin not registered: Username Already Taken');
  }
  const hashedPassword = await bcrypt.hash(
    adminRegistrationData.password,
    saltRounds,
  );
  const registeredAdmin = await prisma_client.admin.create({
    data: {
      ...adminRegistrationData,
      password: hashedPassword,
      roleType: 'admin',
    },
  });
  return new SuccessResponse('Signup Successful', {
    username: registeredAdmin.username,
  });
};

const uploadAdminImageMethod = async (adminImage: any, adminId: number) => {
  const uploadDirectory = path.resolve(
    __dirname,
    '../../../public/images/admin',
  );

  const admin = await prisma_client.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  if (!admin) {
    throw new NotFoundError("Admin doesn't Exist");
  }

  const fileName = uuidv4() + path.extname(adminImage.name);
  const uploadPath = path.join(uploadDirectory, fileName);

  // Assign the fileName to the adminImage property if admin exists
  const updatedAdmin = await prisma_client.admin.update({
    where: {
      id: adminId,
    },
    data: {
      userImage: fileName,
    },
  });
  adminImage.mv(uploadPath);
  return new SuccessResponse('Admin Image Uploaded', updatedAdmin);
};

const deleteAdminImageMethod = async (adminId: number) => {
  var imagePath = '';
  const imgPath = await prisma_client.admin.findFirst({
    where: { id: adminId },
    select: {
      userImage: true,
    },
  });

  if (imgPath?.userImage) {
    imagePath = imgPath?.userImage;
  }
  const decodedImagePath = decodeURIComponent(imagePath);

  const uploadDirectory = path.resolve(
    __dirname,
    '../../../public/images/admin',
  );
  const finalPath = path.join(uploadDirectory, decodedImagePath);

  try {
    await fs.unlink(finalPath);
  } catch (error) {
    throw new NotFoundError("Image doesn't exist");
  }

  const deleteImage = await prisma_client.admin.update({
    where: {
      id: adminId,
    },
    data: {
      userImage: null,
    },
  });

  return new SuccessResponse('Admin Image Removed Successfully', deleteImage);
};
export { RegisterAdminMethod, uploadAdminImageMethod, deleteAdminImageMethod };
