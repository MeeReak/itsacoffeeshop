import {
  CheckoutPayload,
  CheckoutResponse,
  PaymentStatus,
  PaymentStatusResponse,
} from '@/types/api/payment';

let statusCounter = 0;

export const checkout = async (
  orderId: number,
  payload: CheckoutPayload,
): Promise<CheckoutResponse> => {
  statusCounter = 0; // Reset polling simulation
  
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    id: Math.floor(Math.random() * 100000),
    amount: 12.5, // In a real app, this comes from the order
    method: payload.method,
    currency: payload.currency,
    qr: `https://itscoffeeshop.com/pay/${orderId}`,
    expireAt: new Date(Date.now() + 5 * 60000).toISOString(), // 5 mins from now
  };
};

export const getStatus = async (
  _paymentId: number,
): Promise<PaymentStatusResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  statusCounter++;

  // Simulate: 3 pending calls, then success
  if (statusCounter < 4) {
    return { status: PaymentStatus.PENDING };
  }

  return { status: PaymentStatus.SUCCESS };
};
