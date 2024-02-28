import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { orderStatus, paymentStatus } from '../models/user.models';
import {
  orderDataInterface,
  createTransactionInterface,
} from '../models/user.models';
import { error } from 'console';

const createOrderMethod = async (orderData: orderDataInterface) => {
  console.log('in create method functionality ', orderData);
  //const payRes= await razorpayCall
  //if payRes-->success,orderStatus=Placed
  //else orderStatus=Pending/Cancelled
  const paymentResponse: string = 'SUCCESS';
  // const paymentResponse: string = 'FAILED';

  const order = await prisma_client.orderDetail.create({
    data: { ...orderData },
  });
  //updating transaction table
  const orderID = order.id;
  const prices = await prisma_client.cartDetails.findUnique({
    where: {
      userDetailsID: orderData.userDetailsID,
    },
    select: {
      price: true,
    },
  });
  var amount = 0;
  const paymentMode = 'Online';
  const status = paymentStatus.SUCCESSFUL;
  prices?.price.forEach((num) => {
    amount += num;
  });
  const transactionData: createTransactionInterface = {
    orderID,
    amount,
    paymentMode,
    status,
  };
  if (paymentResponse == 'SUCCESS') {
    const transaction = await prisma_client.transactionDetail.create({
      data: { ...transactionData },
    });
  } else {
    const cashTransactionData = {
      ...transactionData,
      paymentMode: 'Cash-On-Pickup',
      status: paymentStatus.PENDING,
    };

    const transaction = await prisma_client.transactionDetail.create({
      data: { ...cashTransactionData },
    });
  }

  //updating inventory
  const tempArray = [];
  for (let i = 0; i < orderData.inventoryId.length; i++) {
    tempArray.push({
      inventoryId: order.inventoryId[i],
      quantity: order.quantity[i],
    });
  }

  for (let j = 0; j < tempArray.length; j++) {
    const invId = tempArray[j].inventoryId;
    const item = await prisma_client.inventory.findUnique({
      where: { id: invId },
    });
    if (
      item?.availableQuantity == 0 ||
      Number(item?.availableQuantity) < tempArray[j].quantity
    ) {
      throw new BadRequestError('Sorry! Item stock not available');
    }
    const inventory = await prisma_client.inventory.update({
      where: { id: invId },
      data: { availableQuantity: { decrement: tempArray[j].quantity } },
    });
  }
  //set order status to placed
  const updatedOrderData: orderDataInterface = {
    ...orderData,
    Status: orderStatus.PLACED,
  };
  const updatedOrder = await prisma_client.orderDetail.update({
    where: { id: order.id },
    data: { ...updatedOrderData },
  });
  //deleting current cart
  const cartDeletion = await prisma_client.cartDetails.delete({
    where: { userDetailsID: orderData.userDetailsID },
  });
  return new SuccessResponse('Order Created', updatedOrder);
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
