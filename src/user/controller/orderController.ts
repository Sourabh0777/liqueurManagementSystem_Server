import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import * as orderService from '../services/orderServices';
import prisma_client from '../../config/prisma';
import { orderStatus } from '../models/user.models';

const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //i will be having userid
    console.log(req.body.decodeToken.id);
    const cartDetails = await prisma_client.cartDetails.findUnique({
      where: {
        userDetailsID: req.body.decodeToken.id,
      },
    });
    if (!cartDetails) {
      throw new NotFoundError('No such record exists');
    }
    const cartDetailsID = cartDetails?.id;
    const quantity = cartDetails?.quantity;
    const Status: orderStatus = orderStatus.PENDING;

    const createOrder = await orderService.createOrder({
      cartDetailsID,
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
    //i will be having userid
    const cartDetails = await prisma_client.cartDetails.findUnique({
      where: {
        userDetailsID: req.body.decodeToken.id,
      },
    });
    if (!cartDetails) {
      throw new NotFoundError('No such record exists');
    }

    const orderDetail = await prisma_client.orderDetail.findUnique({
      where: {
        cartDetailsID: cartDetails.id,
      },
    });
    if (!orderDetail) {
      throw new NotFoundError('No such order exists');
    }

    const getOrder = await orderService.getOrder(orderDetail.id);
    return getOrder.send(res);
  } catch (error) {
    return next(error);
  }
};

const cancelOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cartDetails = await prisma_client.cartDetails.findUnique({
      where: {
        userDetailsID: req.body.decodeToken.id,
      },
    });
    if (!cartDetails) {
      throw new NotFoundError('No such record exists');
    }

    const orderDetail = await prisma_client.orderDetail.findUnique({
      where: {
        cartDetailsID: cartDetails.id,
      },
    });
    if (!orderDetail) {
      throw new NotFoundError('No such order exists');
    }

    const canelOrder = await orderService.cancelOrder(orderDetail.id);
    return canelOrder.send(res);
  } catch (error) {
    return next(error);
  }
};

const getAllOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //i will be having userid
    const cartDetails = await prisma_client.cartDetails.findUnique({
      where: {
        userDetailsID: req.body.decodeToken.id,
      },
    });
    if (!cartDetails) {
      throw new NotFoundError('No such record exists');
    }

    const orderDetail = await prisma_client.orderDetail.findUnique({
      where: {
        cartDetailsID: cartDetails.id,
      },
    });
    if (!orderDetail) {
      throw new NotFoundError('No such order exists');
    }

    const getAllOrders = await orderService.getAllOrders(orderDetail.id);
    return getAllOrders.send(res);
  } catch (error) {
    return next(error);
  }
};

export {
  createOrderController,
  getOrderController,
  cancelOrderController,
  getAllOrderController,
};
