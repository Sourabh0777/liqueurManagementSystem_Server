import * as vendorPaymentMethod from '../methods/vendorConfirmPayment.method';

const confirmPaymentService = async (orderID: number) => {
  const serviceResponse = await vendorPaymentMethod.confirmPaymentMethod(
    orderID,
  );
  return serviceResponse;
};

export { confirmPaymentService };
