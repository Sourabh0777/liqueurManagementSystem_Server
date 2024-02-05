import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../secrets';
const generateAuthToken = (phoneNumber: number, id: number) => {
  return jwt.sign({ phoneNumber, id }, JWT_SECRET_KEY, {
    expiresIn: '72h',
  });
};
export { generateAuthToken };
