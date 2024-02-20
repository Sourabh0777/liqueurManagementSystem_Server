import * as userOrderMethods from '../methods/order.method';
import { orderDataInterface } from '../models/user.models';

const createOrderService = async (orderData: orderDataInterface) => {
  const orderResponse = await userOrderMethods.createOrderMethod(orderData);
  return orderResponse;
};

const getOrderService = async (orderID: number) => {
  const fetchOrder = await userOrderMethods.getOrderMethod(orderID);
  return fetchOrder;
};

const cancelOrderService = async (orderID: number) => {
  const deleteOrder = await userOrderMethods.cancelOrderMethod(orderID);
  return deleteOrder;
};

const getAllOrderService = async (userId: number) => {
  const getAllOrders = await userOrderMethods.getAllOrdersMethod(userId);
  return getAllOrders;
};

export {
  createOrderService,
  getOrderService,
  cancelOrderService,
  getAllOrderService,
};
