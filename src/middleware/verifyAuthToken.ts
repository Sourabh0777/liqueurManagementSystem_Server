import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../secrets';
import { AuthFailureError, ForbiddenError } from '../core/ApiError';

export interface CustomRequest extends Request {
  cookies: {
    user_access_token?: string;
  };
  user?: any;
}
const verifyIsLoggedIn = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.user_access_token;
    if (!token) {
      throw new ForbiddenError('Token is required for authentication.');
    }
    try {
      const decodeToken = jwt.verify(token, JWT_SECRET_KEY);
      req.body.decodeToken = decodeToken;
      return next();
    } catch (error) {
      throw new AuthFailureError('unauthorized invalid token.');
    }
  } catch (err) {
    return next(err);
  }
};
const verifyIsAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.decodeToken && req.body.decodeToken.roleType == 'admin') {
      next();
    } else {
      throw new ForbiddenError('Token is required for authentication.');
    }
  } catch (err) {
    return next(err);
  }
};
export { verifyIsLoggedIn, verifyIsAdmin };
