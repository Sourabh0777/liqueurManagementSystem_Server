export interface userRegistrationInterface {
  phoneNumber: string;
  otp?: number;
  otpExpiry?: Date;
}

export interface userDataInterface {
  Id          :number;
  firstName   :string;
  lastName   :string;
  addressLine1 :string;
  addressLine2  :string;
  city          :string;
  state         :string;
  country       :string;
  zipCode       :string;
  userName      :string;  
  phoneNumber   :string;
}
