import { getAxios } from '@/lib/axios';
import { Order, OrderPayload, OrderResponse } from '@/types/api/order';

const axios = getAxios();

export const getOrderById = async (id: number): Promise<Order> => {
  const { data } = await axios.get(`/orders/${id}`);
  return data;
};

export const createOrder = async (
  payload: OrderPayload,
): Promise<OrderResponse> => {
  const { data } = await axios.post('/orders', payload);
  return data;
};

export const updateOrder = async (
  id: string,
  payload: OrderPayload,
): Promise<OrderResponse> => {
  const { data } = await axios.put(`/orders/${id}`, payload);
  return data;
};
