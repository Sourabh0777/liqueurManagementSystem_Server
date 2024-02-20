export interface userRegistrationInterface {
  phoneNumber: string;
  otp?: number;
  otpExpiry?: Date;
}

export interface userDataInterface {
  Id: number;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userName: string;
  phoneNumber: string;
  decodeToken: {
    id: number;
    phoneNumber: string;
  };
}

export interface CartDataInterface {
  userDetailsID: number;
  inventoryId: number;
  quantity: number;
  SingleItemprice: number;
}

export enum orderStatus {
  PENDING = 'PENDING',
  PLACED = 'PLACED',
  PICKED = 'PICKED',
  CANCELLED = 'CANCELLED',
}

export interface orderDataInterface {
  inventoryId: number[];
  quantity: number[];
  userDetailsID: number;
  Status: orderStatus;
}
