import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { CartDataInterface } from '../models/user.models';

const addCartMethod = async (cartData: CartDataInterface) => {
  const addToCart = await prisma_client.cartDetails.create({
    data: { ...cartData },
  });
  return new SuccessResponse('Cart Created', addToCart);
};

const getCartMethod = async (userId: number) => {
  const getUserCart = await prisma_client.cartDetails.findUnique({
    where: {
      userDetailsID: userId,
    },
  });
  if (!getUserCart) {
    throw new NotFoundError('User Cart not Found');
  }
  return new SuccessResponse('Fetched User Cart', getUserCart);
};

const deleteCartMethod = async (userId: number) => {
  const deleteUserCart = await prisma_client.cartDetails.delete({
    where: {
      userDetailsID: userId,
    },
  });
  if (!deleteUserCart) {
    throw new NotFoundError('User Cart not Found');
  }
  return new SuccessResponse('Deleted User Cart', deleteUserCart);
};

const updateCartMethod = async (cartData: CartDataInterface) => {
  const { userDetailsID, inventoryId, ...newData } = cartData;
  const updateCart = await prisma_client.cartDetails.update({
    where: {
      userDetailsID: userDetailsID,
      inventoryId: inventoryId,
    },
    data: { ...newData },
  });
  return new SuccessResponse('Updated User Cart', updateCart);
};
export { addCartMethod, getCartMethod, deleteCartMethod, updateCartMethod };
