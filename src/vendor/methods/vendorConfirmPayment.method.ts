import prisma_client from '../../config/prisma';
import { BadRequestError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import {
  paymentStatus,
  vendorConfirmPaymentInterface,
} from '../models/vendor.models';

const confirmPaymentMethod = async (orderID: number) => {
  const checkTransaction = await prisma_client.transactionDetail.findUnique({
    where: { orderID: orderID },
  });
  if (checkTransaction?.paymentMode != 'Cash-On-Pickup') {
    throw new BadRequestError('Invalid Order');
  }
  const status = paymentStatus.SUCCESSFUL;
  const paymentData: vendorConfirmPaymentInterface = { status };
  const transaction = await prisma_client.transactionDetail.update({
    where: { orderID: orderID },
    data: { ...paymentData },
  });
  return new SuccessResponse('Transaction Updated!', paymentData);
};

export { confirmPaymentMethod };
