import { Gender } from '@prisma/client';

export interface adminRegistrationInterface {
  firstName: string;
  lastName: string;
  emailAddress: string;
  username: string;
  password: string;
}

export interface adminDetails {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
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
  decodeToken: {
    username: string;
    id: number;
    roleType: string;
  };
}

export interface categoryInterface {
  categoryName: string;
  categoryDetails: string;
}

export interface subCategoryInterface {
  categoryDetailsID: number;
  subCategoryName: string;
  subCategoryDetails: string;
}
export interface createProductInterface {
  subCategoryDetailsID: number;
  productName: string;
  measureQuantity: number;
  measureUnit: string;
  countryOfOrigin: string;
  ABV: number;
  enabled?: boolean;
}
export interface updateProductInterface {
  productId: number;
  UpdateProduct: {
    subCategoryDetailsID?: number;
    productName?: string;
    measureQuantity?: number;
    measureUnit?: string;
    countryOfOrigin?: string;
    ABV?: number;
    enabled?: boolean;
  };
}
