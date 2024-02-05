import prisma_client from "../../config/prisma";
import { NotFoundError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import { vendorDetails } from "../models/vendor.models";

const fetchVendorMethod=async(VendorData:vendorDetails)=>{
    
    const {Id}=VendorData;
    const getVendor=await prisma_client.vendor.findUnique({
        where:{
            id:Id
        }
    })
    if(!getVendor)
    {
        throw new NotFoundError("Vendor not Found");
    }

    return new SuccessResponse("Fetched the vendor details",getVendor);
}

export {fetchVendorMethod};