import * as Vendorauthmethods from  '../methods/vendorAuth.method'
import { vendorDetails } from '../models/vendor.models'

const getVendorService= async(getVendor:vendorDetails)=>{

    const getVendorResponse= await Vendorauthmethods.fetchVendorMethod(getVendor);
    return getVendorResponse;

}

export {getVendorService};