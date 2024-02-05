import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key_here'; // Replace with your secret key

const generateToken = (data: any) => {
  return jwt.sign(data, secretKey, { expiresIn: '1h' }); // Adjust expiry time as per your requirements
};
export { generateToken };
