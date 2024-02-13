import prisma_client from '../../config/prisma';
import { SuccessResponse } from '../../core/ApiResponse';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import { CartDataInterface } from '../models/user.models';

const addCartMethod = async (cartData: CartDataInterface) => {
  // checking if cart already exists
  const cart = await prisma_client.cartDetails.findUnique({
    where: {
      userDetailsID: cartData.userDetailsID,
    },
  });
  //if no cart exists then create a cart
  if (!cart) {
    const cartCreation = await prisma_client.cartDetails.create({
      data: {
        userDetailsID: cartData.userDetailsID,
        quantity: [cartData.quantity],
        inventoryId: [cartData.inventoryId],
      },
    });

    return new SuccessResponse('Cart Created', cartCreation);
  }

  const index = cart.inventoryId.indexOf(cartData.inventoryId);

  if (index !== -1) {
    // If particular invID exists, append quantity
    cart.quantity[index] += cartData.quantity;
  } else {
    // If invID doesn't exist, add new item

    cart.inventoryId.push(cartData.inventoryId);
    cart.quantity.push(cartData.quantity);
  }

  // Update the cart in the database
  const updatedCart = await prisma_client.cartDetails.update({
    where: {
      userDetailsID: cartData.userDetailsID,
    },
    data: {
      inventoryId: cart.inventoryId,
      quantity: cart.quantity,
    },
  });

  return new SuccessResponse('Cart Updated Successfully', updatedCart);
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

export { addCartMethod, getCartMethod, deleteCartMethod };
