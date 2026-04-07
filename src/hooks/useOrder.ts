import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAxios } from '@/lib/axios';

export type UpdateOrder = {
  id: string;
  payload: OrderPayload;
};

export type OrderPayload = {
  type: 1 | 2;
  cashierId: number;
  orderItems: {
    productId: number;
    quantity: number;
    size: 1 | 2 | 3;
    note?: string;
    number: string;
  }[];
};

export type OrderResponse = {
  id: number;
  number: string;
  total: number;
};

const axiosInstance = getAxios(); // this is your AxiosInstance

export type productDetail = {
  id: number;
  productName: string;
  price: number;
  imageUrl: string;
};

export type orderItem = {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  size: number;
  note: string;
  productDetails: productDetail;
};

export type Order = {
  id: number;
  number: string;
  type: 1 | 2;
  status: number;
  subTotal: number;
  tax: number;
  total: number;
  orderItems: orderItem[];
};

export const useGetOrderItemById = (id: number) => {
  return useQuery<OrderPayload>({
    queryKey: ['order', id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          `/orders/${id}?api-version=2026-01-01`,
        );
        return data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const apiError = (err.response?.data as any)?.error;
          const message =
            apiError?.details?.[0]?.message || apiError?.message || err.message;
          throw new Error(message);
        }
        throw new Error('Something went wrong');
      }
    },
  });
};

export const useGetOrderItemProductById = (id: number) => {
  return useQuery<Order>({
    queryKey: ['order', id],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(
          `/orders/${id}?api-version=2026-01-01`,
        );
        return data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const apiError = (err.response?.data as any)?.error;
          const message =
            apiError?.details?.[0]?.message || apiError?.message || err.message;
          throw new Error(message);
        }
        throw new Error('Something went wrong');
      }
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, OrderPayload>({
    mutationFn: async (payload: OrderPayload) => {
      try {
        const { data } = await axiosInstance.post(
          '/orders?api-version=2026-01-01',
          payload,
        );
        return data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const apiError = (err.response?.data as any)?.error;

          const message =
            apiError?.details?.[0]?.message || apiError?.message || err.message;

          throw new Error(message);
        }

        throw new Error('Something went wrong');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, UpdateOrder>({
    mutationFn: async (payload: UpdateOrder) => {
      try {
        const { data } = await axiosInstance.put(
          `/orders/${payload.id}?api-version=2026-01-01`,
          payload.payload,
        );
        return data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const apiError = (err.response?.data as any)?.error;

          const message =
            apiError?.details?.[0]?.message || apiError?.message || err.message;

          throw new Error(message);
        }

        throw new Error('Something went wrong');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
