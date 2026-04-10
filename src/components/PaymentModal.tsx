'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { CheckCircle, AlertCircle, Loader2, QrCode } from 'lucide-react';
import { KHQRCard } from './KHQRCard';
import { useCheckoutPayment, usePaymentStatus } from '@/hooks/usePayment';
import {
  PaymentCurrency,
  PaymentMethod,
  PaymentStatus,
} from '@/types/api/payment';
import { toast } from 'sonner';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface PaymentModalProps {
  orderId: number;
  orderNumber?: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  orderId,
  orderNumber,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [paymentId, setPaymentId] = React.useState<number | null>(null);
  const [qrData, setQrData] = React.useState<{
    qr: string;
    amount: number;
    expireAt: string;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const router = useRouter();
  // API Hooks
  const { mutate: checkout, isPending: isGenerating } = useCheckoutPayment();
  const { data: statusData, isError: isPollingError } = usePaymentStatus(
    paymentId,
    isOpen,
  );
  const { clearCart } = useCart();

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);

    if (qrData?.expireAt && new Date(qrData.expireAt).getTime() > Date.now()) {
      // If QR is still valid, just reopen dialog
      return;
    }

    // 1. Initiate Checkout
    // Initial Checkout Call
    checkout(
      {
        orderId,
        payload: {
          method: PaymentMethod.KHQR,
          currency: PaymentCurrency.USD,
        },
      },
      {
        onSuccess: (data) => {
          setPaymentId(data.id);
          setQrData({
            qr: data.qr,
            amount: data.amount,
            expireAt: data.expireAt,
          });

          // Initialize timer
          const diffInSecs = Math.max(
            0,
            Math.floor((new Date(data.expireAt).getTime() - Date.now()) / 1000),
          );
          setTimeLeft(diffInSecs);
        },
        onError: (error) => {
          toast.error(`Checkout failed: ${error.message}`);
          setIsOpen(false);
        },
      },
    );
  };

  // 1. Timer Countdown Logic
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || !isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isOpen]);

  // 2. Format timer into MM:SS
  const formattedTime = useMemo(() => {
    if (timeLeft === null) return '00:00';
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  // 3. Handle Status Updates (Success/Failure)
  useEffect(() => {
    if (!statusData) return;

    if (statusData.status === PaymentStatus.SUCCESS) {
      toast.success('Payment completed successfully!');
      localStorage.removeItem('orderId'); // Integration point
      localStorage.removeItem('cart'); // Clear cart on success
      clearCart(); // Clear cart context

      // Auto-close after 2s
      setTimeout(() => setIsOpen(false), 5000);
      router.push(`/menu`);
    } else if (
      statusData.status === PaymentStatus.FAILED ||
      (timeLeft === 0 && !isGenerating)
    ) {
      toast.error('Payment expired or was declined.');
    }
  }, [statusData, timeLeft, isGenerating]);

  // UI Derived States
  const isFinished =
    statusData?.status === PaymentStatus.SUCCESS ||
    statusData?.status === PaymentStatus.FAILED ||
    timeLeft === 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onClick={handleOpen}
        className="bg-black text-white py-4 rounded-xl hover:opacity-90 transition text-lg font-bold w-full cursor-pointer flex items-center justify-center gap-2"
      >
        <QrCode className="w-6 h-6" />
        Pay Now
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isGenerating
              ? 'Securing Transaction...'
              : isFinished
                ? 'Transaction Summary'
                : 'Scan to Pay'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-6 mt-4">
          {/* State: Loading/Generating */}
          {isGenerating && (
            <div className="py-12 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin w-12 h-12 text-[#f5dc50]" />
              <p className="text-gray-500 animate-pulse">
                Connecting to payment gateway...
              </p>
            </div>
          )}

          {/* State: Waiting for Scan (Pending) */}
          {!isGenerating && qrData && !isFinished && (
            <>
              <div className="relative">
                <KHQRCard
                  qrUrl={qrData.qr}
                  amount={qrData.amount}
                  currency="USD"
                  username={`Order ${orderNumber || `#${orderId}`}`}
                />
                {timeLeft !== null && timeLeft < 30 && (
                  <div className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold animate-bounce">
                    Expiring soon!
                  </div>
                )}
              </div>

              <div className="text-center ">
                <p className="text-sm text-gray-500 mb-1">
                  Waiting for payment...
                </p>
                <p
                  className={`text-2xl font-mono font-bold ${timeLeft !== null && timeLeft < 60 ? 'text-red-500' : 'text-gray-800'}`}
                >
                  {formattedTime}
                </p>
                {isPollingError && (
                  <p className="text-xs text-red-400 mt-2">
                    Polling connection lost. Reconnecting...
                  </p>
                )}
              </div>

              {/* <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Automatic status check active...</span>
              </div> */}
            </>
          )}

          {/* State: Success */}
          {statusData?.status === PaymentStatus.SUCCESS && (
            <div className="py-8 flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <CheckCircle className="w-24 h-24 text-green-500" />
                <div className="absolute inset-0 animate-ping rounded-full bg-green-100 -z-10 opacity-75"></div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-800">Success!</p>
                <p className="text-gray-600">Your order has been confirmed.</p>
              </div>
              <DialogClose className="mt-4 w-full px-8 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition">
                Close
              </DialogClose>
            </div>
          )}

          {/* State: Expired or Failed */}
          {(statusData?.status === PaymentStatus.FAILED ||
            (timeLeft === 0 && !isGenerating)) && (
            <div className="py-8 flex flex-col items-center gap-4 text-center">
              <AlertCircle className="w-24 h-24 text-red-500" />
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-800">
                  Payment Failed
                </p>
                <p className="text-gray-600">
                  The transaction expired or was declined.
                </p>
              </div>
              <div className="flex flex-col w-full gap-2 mt-4">
                <button
                  onClick={handleOpen}
                  className="w-full px-8 py-3 bg-black text-white font-bold rounded-xl hover:opacity-90 transition"
                >
                  Try Again
                </button>
                <DialogClose className="text-sm text-gray-400 hover:text-gray-600 py-2">
                  Cancel
                </DialogClose>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
