import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../core/ApiError';

export const validateUserRegisterRequest = [
  check('phoneNumber')
    .custom((value, { req }) => {
      if (!value || value.trim() === '') {
        throw new Error('phoneNumber is required');
      }
      return true;
    })
    .withMessage('phoneNumber is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Incorrect phoneNumber'),
];

export const validateVerifyOtpRequest = [
  check('otp').exists().withMessage('otp is required'),
  check('phoneNumber')
    .custom((value, { req }) => {
      if (!value || value.trim() === '') {
        throw new Error('phoneNumber is required');
      }
      return true;
    })
    .withMessage('phoneNumber is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Incorrect phoneNumber'),
];

export const validateLoginRequest = [
  check('phoneNumber')
    .custom((value, { req }) => {
      if (!value || value.trim() === '') {
        throw new Error('phoneNumber is required');
      }
      return true;
    })
    .withMessage('phoneNumber is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Incorrect phoneNumber'),
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
