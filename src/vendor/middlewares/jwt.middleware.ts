import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../secrets';
const generateAuthToken = (id: number, username: string) => {
  return jwt.sign({ username, id }, JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
};
export { generateAuthToken };
