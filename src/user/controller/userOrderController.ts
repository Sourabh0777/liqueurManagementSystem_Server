import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import * as orderService from '../services/order.service';
import prisma_client from '../../config/prisma';
import { orderStatus } from '../models/user.models';

const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userDetailsID = req.body.decodeToken.id;
    const cartDetails = await prisma_client.cartDetails.findUnique({
      where: {
        userDetailsID: userDetailsID,
      },
    });
    if (!cartDetails) {
      throw new NotFoundError('No such record exists');
    }
    const inventoryId = cartDetails.inventoryId;
    const quantity = cartDetails.quantity;
    const Status: orderStatus = orderStatus.PENDING;

    const createOrder = await orderService.createOrderService({
      inventoryId,
      userDetailsID,
      quantity,
      Status,
    });
    return createOrder.send(res);
  } catch (error) {
    return next(error);
  }
};

const getOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.query;
    if (!orderId) {
      throw new NotFoundError('No such order exists');
    }

    const getOrder = await orderService.getOrderService(Number(orderId));
    return getOrder.send(res);
  } catch (error) {
    return next(error);
  }
};

const getAllUserOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.decodeToken.id;
    const AllOrders = await orderService.getAllOrderService(userId);
    return AllOrders.send(res);
  } catch (error) {
    return next(error);
  }
};
// const cancelOrderController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const cartDetails = await prisma_client.cartDetails.findUnique({
//       where: {
//         userDetailsID: req.body.decodeToken.id,
//       },
//     });
//     if (!cartDetails) {
//       throw new NotFoundError('No such record exists');
//     }

//     const orderDetail = await prisma_client.orderDetail.findUnique({
//       where: {
//         cartDetailsID: cartDetails.id,
//       },
//     });
//     if (!orderDetail) {
//       throw new NotFoundError('No such order exists');
//     }

//     const cancelOrder = await orderService.cancelOrderService(orderDetail.id);
//     return cancelOrder.send(res);
//   } catch (error) {
//     return next(error);
//   }
// };

export {
  createOrderController,
  getOrderController,
  //cancelOrderController,
  getAllUserOrdersController,
};
