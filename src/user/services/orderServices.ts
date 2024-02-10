import * as ordertMethods from '../methods/orderMethods';
import { orderDataInterface } from '../models/user.models';

// const addCartService = async (cartData: CartDataInterface) => {
//   const serviceResponse = await cartMethods.addCartMethod(cartData);
//   return serviceResponse;
// };

const createOrder = async (orderData: orderDataInterface) => {
  const orderResponse = await ordertMethods.createOrder(orderData);
  return orderResponse;
};

const getOrder = async (orderID: number) => {
  const fetchorder = await ordertMethods.getOrderMethod(orderID);
  return fetchorder;
};

const cancelOrder = async (orderID: number) => {
  const deletOrder = await ordertMethods.cancelOrder(orderID);
  return deletOrder;
};

const getAllOrders = async (orderID: number) => {
  const getAll = await ordertMethods.getAllOrders(orderID);
  return getAll;
};

export { createOrder, getOrder, cancelOrder, getAllOrders };
