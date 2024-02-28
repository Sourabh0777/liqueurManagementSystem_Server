import { Request, Response, NextFunction } from 'express';
import * as vendorAuthService from '../services/vendorAuth.service';
import { AuthFailureError } from '../../core/ApiError';
import bcrypt from 'bcrypt';
import { generateAuthToken } from '../middlewares/jwt.middleware';
import { UploadedFile } from 'express-fileupload';

const vendorRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, emailAddress, username, password } = req.body;
    const vendorRegistrationResponse =
      await vendorAuthService.vendorRegisterService({
        firstName,
        lastName,
        emailAddress,
        username,
        password,
      });
    return vendorRegistrationResponse.send(res);
  } catch (error) {
    console.log('error');
    next(error);
  }
};

const vendorLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    const vendor = await vendorAuthService.VendorLoginService(
      username,
      password,
    );

    if (!vendor) {
      new AuthFailureError('Invalid Credentials');
      return;
    }

    const validPassword = await bcrypt.compare(password, vendor.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Invalid Credentials' });
      return;
    }
    const id = vendor.id;
    return res
      .cookie('user_access_token', generateAuthToken(id, username), {
        httpOnly: true,
      })
      .json({ Success: 'Login Successful' });
  } catch (error) {
    console.log('Error while logging in', error);
    next(error);
  }
};

const getVendorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const VendorId = req.params.id;
    const getVendorResponse = await vendorAuthService.getVendorService(
      Number(VendorId),
    );
    return getVendorResponse.send(res);
  } catch (error) {
    return next(error);
  }
};

const deleteVendorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vendorId = req.body.decodeToken.id;
    const deleteVendorResponse = await vendorAuthService.deleteVendorService(
      Number(vendorId),
    );

    return deleteVendorResponse.send(res);
  } catch (error) {
    console.log('Error deleting vendor', error);
    next(error);
  }
};

const updateVendorDataController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vendorDataUpdateResponse =
      await vendorAuthService.vendorDataUpdateService(req.body);
    return vendorDataUpdateResponse.send(res);
  } catch (error) {
    console.log('updateUserDataController error:', error);
    next(error);
  }
};

const updateVendorPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vendorId = req.body.decodeToken.id;
    const { username, currentPassword, newPassword } = req.body;
    const updatePasswordResponse =
      await vendorAuthService.updateVendorPasswordService(
        vendorId,
        username,
        currentPassword,
        newPassword,
      );
    return updatePasswordResponse.send(res);
  } catch (error) {
    console.log('Error updating password:', error);
    next(error);
  }
};

const vendorUploadController = async (
  req:Request, 
  res:Response, 
  next:NextFunction) => {
  try {
    if (!req.files) {
      return res.status(400).send("No files were uploaded");
    }

    // const path=require("path");
    // let imagesTable=[];
    const uploadedFile= req.files.userImage;
    // if(Array.isArray(imagePath)){
    //   imagesTable=vendorImage
    // }else{
    //   imagesTable.push(req.files.vendorImage);
    // }
    const uploadResponse = await vendorAuthService.vendoruploadService(req.body.decodeToken.id, uploadedFile);
    return res.status(200).json(uploadResponse);
  } catch (error) {
    console.error('Error uploading file:', error);
    next(error);
  }
};

export {
  vendorRegisterController,
  vendorLoginController,
  getVendorController,
  deleteVendorController,
  updateVendorDataController,
  updateVendorPasswordController,
  vendorUploadController,
};
