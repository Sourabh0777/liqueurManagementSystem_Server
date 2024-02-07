export interface userRegistrationInterface {
  phoneNumber: string;
  otp?: number;
  otpExpiry?: Date;
}
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
=======

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
>>>>>>> b77e216d91bd6c1328849815beb9469289ee93a3
