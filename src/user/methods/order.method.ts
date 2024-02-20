import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { orderStatus } from '../models/user.models';
import { orderDataInterface } from '../models/user.models';

const createOrderMethod = async (orderData: orderDataInterface) => {
  console.log('in create method functionality ', orderData);
  //const payRes= await razorpayCall
  //if payRes-->success,orderStatus=Placed
  //else orderStatus=Pending/Cancelled

  const order = await prisma_client.orderDetail.create({
    data: { ...orderData },
  });
  //entry in transcation table
  //updation in inventory table
  //delete cart
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

const cancelOrderMethod = async (orderId: number) => {
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

const getAllOrdersMethod = async (userId: number) => {
  const allOrders = await prisma_client.orderDetail.findMany({
    where: {
      userDetailsID: userId,
    },
    orderBy: [{ updatedAt: 'desc' }],
  });
  if (!allOrders) {
    throw new NotFoundError('No Order History');
  }
  return new SuccessResponse('Orders Fetched', allOrders);
};

export {
  createOrderMethod,
  getOrderMethod,
  cancelOrderMethod,
  getAllOrdersMethod,
};
