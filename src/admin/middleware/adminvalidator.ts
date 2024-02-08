import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateAdminRegisterRequest = [
  check('firstName').notEmpty().withMessage('firstName is required'),
  check('lastName').notEmpty().withMessage('lastName is required'),
  check('emailAddress')
    .notEmpty()
    .withMessage('email Address is required')
    .isEmail()
    .withMessage('inavlid Email Address'),
  check('username').notEmpty().withMessage('username is required'),
  check('password').notEmpty().withMessage('password is required'),
];

export const validateAdminLoginRequest = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

export const validateUpdateAdminPassword = [
  check('username').notEmpty().withMessage('Username is required'),
  check('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  check('newPassword').notEmpty().withMessage('New password is required'),
];

export const validateDeleteAdminRequest = [
  check('id').notEmpty().withMessage('Admin Id is required'),
];

export const validateAddCategory = [
  check('categoryName').notEmpty().withMessage('Category name is required'),
  check('categoryDetails')
    .notEmpty()
    .withMessage('Category details are required'),
];

export const validateAddSubCategory = [
  check('categoryDetailsID')
    .notEmpty()
    .withMessage('Category details ID is required'),
  check('subCategoryName')
    .notEmpty()
    .withMessage('Subcategory name is required'),
  check('subCategoryDetails')
    .notEmpty()
    .withMessage('Subcategory details are required'),
];

export const validateAddProduct = [
  check('subCategoryDetailsID')
    .notEmpty()
    .withMessage('Subcategory details ID is required'),
  check('productName').notEmpty().withMessage('Product name is required'),
  check('measureQuantity')
    .notEmpty()
    .withMessage('Measure quantity is required'),
  check('measureUnit').notEmpty().withMessage('Measure unit is required'),
  check('countryOfOrigin')
    .notEmpty()
    .withMessage('Country of origin is required'),
  check('ABV').notEmpty().withMessage('ABV is required'),
  check('enabled').notEmpty().withMessage('Enabled status is required'),
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
