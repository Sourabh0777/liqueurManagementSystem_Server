import { Gender } from ".prisma/client";

export interface vendorDetails{
    id: number;
    firstName: string;
    lastName: string;
    gender: Gender;
    dateOfBirth: Date;
    phoneNumber: string;
    addressLine1: string;
    adressLine2: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    pinCode: string;
    createdAt: Date;
    upadatedAt: Date;
}