import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { orderStatus } from '../models/user.models';
import { orderDataInterface } from '../models/user.models';

const createOrder = async (orderData: orderDataInterface) => {
  console.log('in create method functionality ', orderData);
  const order = await prisma_client.orderDetail.create({
    data: { ...orderData },
  });
  return new SuccessResponse('Order Created', order);
};

const getOrderMethod = async (orderId: number) => {
  const getOrder = await prisma_client.orderDetail.findUnique({
    where: {
      id: orderId,
    },
  });
  if (!getOrder) {
    throw new NotFoundError('No Order Found');
  }
  return new SuccessResponse('Order Fetched', getOrder);
};

const cancelOrder = async (orderId: number) => {
  const cancelOrder = await prisma_client.orderDetail.update({
    where: {
      id: orderId,
    },
    data: {
      Status: orderStatus.CANCELLED,
    },
  });
  if (!cancelOrder) {
    throw new NotFoundError('No Such Order Found');
  }
  return new SuccessResponse('Order Fetched', cancelOrder);
};

const getAllOrders = async (orderID: number) => {
  const getAll = await prisma_client.orderDetail.findMany({
    where: {
      id: orderID,
    },
  });
  if (!getAll) {
    throw new NotFoundError('No Orders Found');
  }
  return new SuccessResponse('All Orders Fetched', getAll);
};
export { createOrder, getOrderMethod, cancelOrder, getAllOrders };
