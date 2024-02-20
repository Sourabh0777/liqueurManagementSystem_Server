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
  const TotalPrice = cartData.SingleItemprice * cartData.quantity;
  //if no cart exists then create a cart
  if (!cart) {
    const cartCreation = await prisma_client.cartDetails.create({
      data: {
        userDetailsID: cartData.userDetailsID,
        quantity: [cartData.quantity],
        inventoryId: [cartData.inventoryId],
        price: [TotalPrice],
      },
    });

    return new SuccessResponse('Cart Created', cartCreation);
  }

  const index = cart.inventoryId.indexOf(cartData.inventoryId);

  if (index !== -1) {
    // If particular invID exists, append quantity
    cart.quantity[index] += cartData.quantity;
    cart.price[index] += TotalPrice;
  } else {
    // If invID doesn't exist, add new item

    cart.inventoryId.push(cartData.inventoryId);
    cart.quantity.push(cartData.quantity);
    cart.price.push(TotalPrice);
  }

  // Update the cart in the database
  console.log('we are in user cart methods and price value is', cart.price);
  const updatedCart = await prisma_client.cartDetails.update({
    where: {
      userDetailsID: cartData.userDetailsID,
    },
    data: {
      inventoryId: cart.inventoryId,
      quantity: cart.quantity,
      price: cart.price,
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

const deleteCartItemMethod = async (inventoryId: number, userId: number) => {
  const cart = await prisma_client.cartDetails.findUnique({
    where: {
      userDetailsID: userId,
    },
  });

  const inventory = await prisma_client.inventory.findUnique({
    where: {
      id: inventoryId,
    },
  });
  if (!inventory) {
    throw new NotFoundError('Inventory Item not Found');
  }

  if (!cart) {
    throw new NotFoundError('User Cart not Found');
  }

  const index = cart.inventoryId.indexOf(inventoryId);

  if (cart.quantity[index] > 1) {
    cart.quantity[index]--;
    cart.price[index] -= inventory?.productPrice;
  } else {
    cart.quantity.splice(index, 1);
    cart.inventoryId.splice(index, 1);
    cart.price.splice(index, 1);
  }
  const updatedCart = await prisma_client.cartDetails.update({
    where: {
      userDetailsID: userId,
    },
    data: {
      inventoryId: cart.inventoryId,
      quantity: cart.quantity,
      price: cart.price,
    },
  });

  return new SuccessResponse('Cart Item Deleted Successfully', updatedCart);
};
export { addCartMethod, getCartMethod, deleteCartMethod, deleteCartItemMethod };
