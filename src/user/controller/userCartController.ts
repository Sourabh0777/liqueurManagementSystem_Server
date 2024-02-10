import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../core/ApiError';
import * as cartService from '../services/userCartService';

const addCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { quantity } = req.body;
    const { inventoryId } = req.params;
    const userDetailsID = req.body.decodeToken.id;

    if (!userDetailsID || !quantity || !inventoryId) {
      throw new BadRequestError('Require input all fields.');
    }
    const createCartData = await cartService.addCartService({
      quantity,
      inventoryId,
      userDetailsID,
    });
    return createCartData.send(res);
  } catch (error) {
    return next(error);
  }
};

const getCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.decodeToken.id;
    const getUserCart = await cartService.getCartService(userId);
    return getUserCart.send(res);
  } catch (error) {
    return next(error);
  }
};

const deleteCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.decodeToken.id;
    const deleteUserCart = await cartService.deleteCartService(userId);
    return deleteUserCart.send(res);
  } catch (error) {
    return next(error);
  }
};

const updateCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userDetailsID = req.body.decodeToken.id;
    const { quantity } = req.body;
    const { inventoryId } = req.params;

    if (!userDetailsID || !quantity || !inventoryId) {
      throw new BadRequestError('Require input all fields.');
    }
    const updateUserCart = await cartService.updateCartService({
      quantity,
      userDetailsID,
      inventoryId,
    });
    return updateUserCart.send(res);
  } catch (error) {
    return next(error);
  }
};
export {
  addCartController,
  getCartController,
  deleteCartController,
  updateCartController,
};
