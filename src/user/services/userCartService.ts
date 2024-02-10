import * as cartMethods from '../methods/userCartMethods';
import { CartDataInterface } from '../models/user.models';

const addCartService = async (cartData: CartDataInterface) => {
  const serviceResponse = await cartMethods.addCartMethod(cartData);
  return serviceResponse;
};

const getCartService = async (userId: number) => {
  const serviceResponse = await cartMethods.getCartMethod(userId);
  return serviceResponse;
};

const deleteCartService = async (userId: number) => {
  const serviceResponse = await cartMethods.deleteCartMethod(userId);
  return serviceResponse;
};

const updateCartService = async (cartData: CartDataInterface) => {
  const serviceResponse = await cartMethods.updateCartMethod(cartData);
  return serviceResponse;
};

export { addCartService, getCartService, deleteCartService, updateCartService };
