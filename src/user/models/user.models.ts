export interface userRegistrationInterface {
  phoneNumber: number;
  otp?: number;
  otpExpiry?: Date;
}

export interface userDataInterface {
  firstName?   :String;
  lastName?   :String;
  addressLine1? :String;
  addressLine2?  :String;
  city?          :String;
  state?         :String;
  country?       :String;
  zipCode?       :String;
  userName?      :String;  
  userImage?     :String;
  phoneNumber?   :string
}
