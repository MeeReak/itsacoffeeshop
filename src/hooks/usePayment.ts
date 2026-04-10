import { useMutation, useQuery } from '@tanstack/react-query';
import { paymentService } from '@/service/payment.service';
import {
  CheckoutPayload,
  CheckoutResponse,
  PaymentStatus,
  PaymentStatusResponse,
} from '@/types';

/**
 * Hook for initiating a new checkout.
 * Returns the mutation state and function.
 */
export const useCheckoutPayment = () => {
  return useMutation<
    CheckoutResponse,
    Error,
    { orderId: number; payload: CheckoutPayload }
  >({
    mutationFn: ({ orderId, payload }) =>
      paymentService.checkout(orderId, payload),
  });
};

/**
 * Hook for polling payment status.
 * Automatically polls every 3 seconds as long as status is PENDING.
 *
 * @param paymentId - The unique ID of the payment to poll
 * @param enabled - Optional flag to start/stop polling (defaults to !!paymentId)
 */
export const usePaymentStatus = (
  paymentId: number | null,
  enabled: boolean = true,
) => {
  return useQuery<PaymentStatusResponse, Error>({
    queryKey: ['payment-status', paymentId],
    queryFn: () => {
      if (!paymentId) throw new Error('Payment ID is required');
      return paymentService.getStatus(paymentId);
    },
    enabled: enabled && !!paymentId,
    refetchInterval: (query) => {
      // ONLY continue polling if the current status is PENDING
      if (query.state.data?.status === PaymentStatus.PENDING) {
        return 3000;
      }
      return false; // Stop polling on Success or Failed
    },
    // Keep data until we manually reset (helpful for Success UI)
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000,
  });
};
