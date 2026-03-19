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
import { useMounted } from '@/hooks/useMounted';

export function CartDialog() {
  const { cart } = useCart();
  const router = useRouter();
  const mounted = useMounted();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Dialog>
      {/* Floating Cart Button */}
      <DialogTrigger>
        {mounted && cart.length > 0 && (
          <div className="fixed top-6 right-40 z-50 w-14 h-14 bg-[#f5dc50] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition cursor-pointer">
            <div className="relative text-black">
              <ShoppingCartIcon />

              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 text-xs font-semibold px-1.5 py-0.5 bg-black text-white rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        )}
      </DialogTrigger>

      {/* Cart Modal */}
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            🛒 Your Order ({totalItems})
          </DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <p className="text-center text-gray-400 py-12">
            Your cart is empty ☕
          </p>
        ) : (
          <>
            {/* Items */}
            <div className="mt-4 space-y-4 max-h-100 overflow-y-auto pr-2">
              {cart.map((item) => (
                <OrderCard key={item.customKey} order={item} />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t mt-6 pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex gap-4">
                <DialogClose className="flex-1 border rounded-xl py-3 hover:bg-gray-100 transition">
                  Continue
                </DialogClose>

                <DialogClose
                  onClick={() => router.push('/checkout')}
                  className="flex-1 bg-[#f5dc50] rounded-xl py-3 font-semibold hover:bg-[#e8ce40] transition"
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
