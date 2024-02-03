import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../secrets';
const generateAuthToken = (phoneNumber: number, otp: number) => {
  return jwt.sign({ phoneNumber }, JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
};
export { generateAuthToken };

