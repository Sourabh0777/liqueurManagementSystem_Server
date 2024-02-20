import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../core/ApiError';
import * as cartService from '../services/cart.service';
import prisma_client from '../../config/prisma';
import { log } from 'console';

const addCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { quantity } = req.body;
    const userDetailsID = req.body.decodeToken.id;
    const { productName, measureQuantity } = req.query;
    const { vendorID } = req.params;

    const productDetail = await prisma_client.productDetail.findFirst({
      where: {
        productName: String(productName),
        measureQuantity: Number(measureQuantity),
      },
    });
    console.log(productDetail);
    const inventory = await prisma_client.inventory.findFirst({
      where: {
        vendorBusinessID: Number(vendorID),
        productDetailsID: productDetail?.id,
      },
    });

    const inventoryId = inventory?.id;
    if (!userDetailsID || !quantity || !inventoryId) {
      throw new BadRequestError('Require input all fields.');
    }

    const SingleItemprice = inventory.productPrice;
    console.log(SingleItemprice);
    const createCartData = await cartService.addCartService({
      quantity,
      inventoryId,
      userDetailsID,
      SingleItemprice,
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

const deleteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //currently i have userid,inventoryid and quantity taking pid from body
    const { inventoryId } = req.body;
    if (!inventoryId) {
      throw new BadRequestError('Require all input fields');
    }
    const removeItem = await cartService.deleteCartItemService(
      inventoryId,
      req.body.decodeToken.id,
    );
    return removeItem.send(res);
  } catch (error) {
    return next(error);
  }
};

export {
  addCartController,
  getCartController,
  deleteCartController,
  deleteItemController,
};
