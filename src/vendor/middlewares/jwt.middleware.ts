import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key_here'; 

const generateToken = (data: any) => {
  return jwt.sign(data, secretKey, { expiresIn: '1h' }); 
};
export { generateToken };
