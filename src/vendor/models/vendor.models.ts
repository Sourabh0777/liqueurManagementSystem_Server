export interface vendorRegistrationInterface {
  firstName: string;
  lastName: string;
  emailAddress: string;
  username: string;
  password: string;
}
export interface vendorDataInterface {
  Id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: Date;
  username: string;
  phoneNumber: string;
  addressLine1: string;
  adressLine2: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  zipcode: string;
  decodeToken: {
    id: number;
    username: string;
  };
}

export interface createInventoryItemInterface {
  vendorBusinessID: number;
  productDetailsID: number;
  productPrice: number;
  totalQuantity: number;
  availableQuantity: number;
}

export interface inventoryDataInterface {
  productDetailsID: number;
  productPrice: number;
  totalQuantity: number;
  availableQuantity: number;
}

export enum paymentStatus {
  PENDING = 'PENDING',
  SUCCESSFUL = 'SUCCESSFUL',
}

export interface vendorConfirmPaymentInterface {
  status: paymentStatus;
}
