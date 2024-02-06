import {Request,Response,NextFunction} from 'express';
import * as vendorAuthService from '../services/vendorAuth.service';
import { AuthFailureError } from '../../core/ApiError';
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/jwt.middleware';

const vendorRegisterController=async(
    req:Request,
    res:Response,
    next:NextFunction,
)=>{

    try{
        const {firstName, lastName, emailAddress, username, password}=req.body;
        const vendorRegistrationResponse=await vendorAuthService.vendorRegisterService({
            firstName, 
            lastName, 
            emailAddress, 
            username, 
            password
        });
        return vendorRegistrationResponse.send(res);
    }catch(error){
        console.log('error');
        next(error);
    }
};

const vendorLoginController=async(
    req:Request,
    res:Response,
    next:NextFunction,
)=>{
    try{

        const {username, password}=req.body;
        
        const vendor=await vendorAuthService.VendorLoginService(username,password);

        if(!vendor){
            new AuthFailureError('Invalid Credentials');
            return;
        }

        const validPassword=await bcrypt.compare(password,vendor.password);

        if(!validPassword){
            res.status(400).json({message:'Invalid Credentials'});
            return;
        }

        const token=generateToken({
            username:vendor.username,
            firstname:vendor.firstName,
            lastname:vendor.lastName,
        });

        res.cookie('jwtToken',token,{httpOnly:true})
        .json({message:'Login Successful'});
    }catch(error)
    {
        console.log('Error while loggin in',error);
        next(error);
    }
}

const getVendorController=async( req:Request,res:Response,next:NextFunction)=>{

    try{
        const getVendorResponse=await vendorAuthService.getVendorService(req.body);
        return getVendorResponse.send(res);
    }catch(error){
        return next(error);
    }
}

const updateVendorController=async(
    req: Request,
    res: Response,
    next: NextFunction,
)=>{
    try{
        const vendorUpdateResponse=await vendorAuthService.updateVendorService(
            req.body,
        );
        return vendorUpdateResponse.send(res);
    }
    catch(error){
        console.log('vendorUpdate error',error);
        next(error);
    }
}

const deleteVendorController=async(
    req: Request,
    res: Response,
    next: NextFunction,
)=>{
    try{
        const vendorId=req.body.id;
        const deleteVendorResponse=await vendorAuthService.deleteVendorService(vendorId);

        return deleteVendorResponse.send(res);
    }
    catch(error){
        console.log('Error deleting vendor',error);
        next(error);
    }
};


export {vendorRegisterController,vendorLoginController,updateVendorController,getVendorController,deleteVendorController};