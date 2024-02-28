import { Request, Response, NextFunction } from 'express';
import * as vendorPaymentService from '../services/vendorConfirmPayment.service';
import { BadRequestError } from '../../core/ApiError';
import { existsSync } from 'fs';
const confirmPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderID = req.params.id;
    if (!orderID) {
      return new BadRequestError('Order does not exist!');
    }
    const confirmPaymentResponse =
      await vendorPaymentService.confirmPaymentService(Number(orderID));
    return confirmPaymentResponse.send(res);
  } catch (err) {
    next(err);
  }
};

export { confirmPaymentController };
