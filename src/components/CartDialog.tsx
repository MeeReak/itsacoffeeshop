'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { OrderCard } from './OrderCard';
import { useRouter } from 'next/navigation';

export function CartDialog() {
  const { cart } = useCart();
  const router = useRouter();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.toString().replace('$', '')) * item.qty,
    0,
  );

  return (
    <Dialog>
      {/* Cart Button */}
      <DialogTrigger>
        <div className="fixed top-6 right-40 z-50 w-12 h-12 bg-[#f8f6f1] text-black rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
          <div className="relative">
            <ShoppingCartIcon />
            {totalItems > 0 ? (
              <span className="absolute -top-2 -right-2 text-sm px-1.5 bg-[#f5dc50] rounded-full">
                {totalItems}
              </span>
            ) : null}
          </div>
        </div>
      </DialogTrigger>

      {/* Bigger Modal */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Your Order ({totalItems})
          </DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            Your cart is empty ☕
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 max-h-100 overflow-y-auto pr-2">
              {cart.map((item) => (
                <OrderCard key={item.id} order={item} />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t pt-6 mt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex gap-4">
                <DialogClose className="flex-1 border rounded-lg py-3 hover:bg-gray-100">
                  Continue Shopping
                </DialogClose>

                <DialogClose
                  onClick={() => router.push('/checkout')}
                  className="flex-1 bg-[#f5dc50] rounded-lg py-3 font-semibold hover:bg-[#e7cc3e]"
                >
                  Checkout
                </DialogClose>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
