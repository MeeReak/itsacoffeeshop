import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/service/order.service';
import { Order, OrderPayload, OrderResponse, UpdateOrder } from '@/types';

export const useGetOrderItemById = (id: number) => {
  return useQuery<Order>({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });
};

export const useGetOrderItemProductById = (id: number) => {
  return useQuery<Order>({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id),
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, OrderPayload>({
    mutationFn: (payload: OrderPayload) => orderService.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, UpdateOrder>({
    mutationFn: (payload: UpdateOrder) =>
      orderService.updateOrder(payload.id, payload.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
