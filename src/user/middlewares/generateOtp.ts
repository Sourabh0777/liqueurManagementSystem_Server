import axios from 'axios';
import { FAST2SMS_API_KEY } from '../../secrets';

const generateOtp = async (phoneNumber: number) => {
  // const otp = Math.floor(1000 + Math.random() * 9000);
  const otp = 3245;
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  //   const response = await axios.get("https://www.fast2sms.com/dev/bulk", {
  //     params: {
  //       authorization: FAST2SMS_API_KEY,
  //       variables_values: `Your OTP is ${otp}`,
  //       route: "otp",
  //       numbers: phoneNumber,
  //     },
  //   });
  return { otpExpiry, otp };
};
export default generateOtp;
