import * as ordertMethods from '../methods/orderMethods';
import { orderDataInterface } from '../models/user.models';

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

export { createOrder, getOrder, cancelOrder };
