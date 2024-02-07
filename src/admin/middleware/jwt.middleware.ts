import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../secrets';
const generateAuthToken = (id: number, username: string, roleType: string) => {
  return jwt.sign({ username, id, roleType }, JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
};
export { generateAuthToken };
