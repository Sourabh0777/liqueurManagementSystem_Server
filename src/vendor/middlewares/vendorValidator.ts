import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateVendorRegisterRequest = [
  check('firstName').notEmpty().withMessage('First Name is required'),
  check('lastName').notEmpty().withMessage('lastName is required'),
  check('emailAddress')
    .notEmpty()
    .withMessage('Email Address is required')
    .isEmail()
    .withMessage('Invalid Email Address'),
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

export const validateVendorLoginRequest = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

export const isRequestValidated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};
