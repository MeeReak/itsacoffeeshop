'use client';

import { useGetOrderItemProductById } from '@/hooks/useOrder';
import { CartItem } from '../CartItem';
import { PaymentModal } from '../PaymentModal';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';
import { ErrorState } from '../ui/states/ErrorState';
import { Skeleton } from '../ui/skeleton/Skeleton';

export const Checkout = ({ id }: { id: string }) => {
  const router = useRouter();
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderItemProductById(Number(id));

  const handleReturnToMenu = () => {
    localStorage.removeItem('orderId');
    router.push('/menu');
  };

  if (isLoading) {
    return (
      <div className="bg-[#f8f6f1] min-h-screen py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6">
          <div className="space-y-6">
            <Skeleton className="h-75 w-full rounded-xl" />
            <div className="bg-white p-6 rounded-xl shadow-md space-y-4 h-74.75">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-5 mt-6 w-1/3" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md h-[623px] flex flex-col">
            <Skeleton className="h-8 w-1/3 mb-6" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-2 mt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-12 w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f1] p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <ErrorState
            title="Order Not Found"
            message="We couldn't find this order. It might have expired or doesn't exist."
            onRetry={() => refetch()}
          />
          <button
            onClick={handleReturnToMenu}
            className="mt-4 w-full py-3 text-gray-500 font-medium hover:text-gray-800 transition text-center"
          >
            ← Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f6f1] min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* LEFT: Customer Info */}
        <section className="space-y-6">
          <div className="relative h-60 md:h-75 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/coffee/checkout.jpg"
              alt="checkout banner"
              fill
              className="object-cover brightness-75"
            />
            <h1 className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-white">
              Checkout
            </h1>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <Badge className="bg-[#f5dc50] text-black border-[#f5dc50] hover:bg-[#f5dc50] flex items-center gap-1.5 px-2 py-3">
                <span className="text-lg">
                  {order.type === 1 ? '🍽️' : '🛍️'}
                </span>
                {order.type === 1 ? 'Dine-in' : 'Takeaway'}
              </Badge>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg text-gray-600 border border-gray-100">
              <p className="flex items-center gap-2">
                <span className="font-bold text-gray-800">Order Number:</span>
                <span className="font-mono text-black">#{order.number}</span>
              </p>
              <p className="mt-2 text-sm">
                Please show this order number at the counter when your number is
                called.
              </p>
            </div>

            <h3 className="text-lg font-semibold mt-6">Payment Method</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <input
                type="radio"
                name="payment"
                checked
                readOnly
                className="accent-[#f5dc50] w-4 h-4"
              />
              <span className="font-medium text-gray-800">
                KHQR Digital Payment
              </span>
            </div>
          </div>
        </section>

        {/* RIGHT: Order Summary */}
        <section className="flex flex-col bg-white justify-between rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <span className="text-gray-400 text-sm font-mono">
              #{order.number}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 max-h-[42vh] scrollbar-hide mb-6 pr-1">
            {order.orderItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span className="text-sm">Subtotal</span>
              <span className="font-medium font-mono">
                ${order.subTotal?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="text-sm">Tax (VAT 10%)</span>
              <span className="font-medium font-mono">
                ${order.tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t mt-3">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold text-black font-mono">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="">
            <PaymentModal orderId={order.id} orderNumber={order.number} />
          </div>
        </section>
      </div>
    </div>
  );
};
