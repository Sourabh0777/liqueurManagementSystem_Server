import { Gender } from '@prisma/client';

export interface adminRegistrationInterface {
<<<<<<< HEAD
  firstName: string;
  lastName: string;
  emailAddress: string;
  username: string;
  password: string;
=======
  phoneNumber
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
}

export interface adminDetails {
  id: number;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  gender: Gender;
  dateOfBirth: Date;
  userImage: string;
  roleType: string;
  accessID: number;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}
