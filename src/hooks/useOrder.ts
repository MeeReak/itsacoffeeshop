import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAxios } from '@/lib/axios';
import {
  Order,
  OrderPayload,
  OrderResponse,
  UpdateOrder,
  ApiErrorResponse,
} from '@/types';

const axiosInstance = getAxios();

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
          const apiError = (err.response?.data as ApiErrorResponse)?.error;
          const message =
            apiError?.details?.[0]?.message || apiError?.message || err.message;
          throw new Error(message);
        }
        throw new Error('Something went wrong');
      }
    },
    enabled: !!id,
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
          const apiError = (err.response?.data as ApiErrorResponse)?.error;
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
          const apiError = (err.response?.data as ApiErrorResponse)?.error;

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
          const apiError = (err.response?.data as ApiErrorResponse)?.error;

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
