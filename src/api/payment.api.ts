import { getAxios } from '@/lib/axios';
import {
  CheckoutPayload,
  CheckoutResponse,
  PaymentStatusResponse,
} from '@/types/api/payment';

const axios = getAxios();

export const checkout = async (
  orderId: number,
  payload: CheckoutPayload,
): Promise<CheckoutResponse> => {
  const { data } = await axios.post(`/payments/${orderId}/checkout`, payload);
  return data;
};

export const getStatus = async (
  paymentId: number,
): Promise<PaymentStatusResponse> => {
  const { data } = await axios.get(`/payments/${paymentId}/status`);
  return data;
};
