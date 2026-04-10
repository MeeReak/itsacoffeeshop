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
import {
  useCreateOrder,
  useGetOrderItemById,
  useUpdateOrder,
} from '@/hooks/useOrder';
import { OrderItem, OrderPayloadItem } from '@/types';
import { toast } from 'sonner';
import { useState, useEffect, useMemo } from 'react';
import { buildOrderPayload, generateCartHash } from '@/utils/cart';

export default function CartDialog() {
  const router = useRouter();
  const mounted = useMounted();
  const { cart } = useCart();

  const { mutate: createOrder, isPending: createPending } = useCreateOrder();
  const { mutate: updateOrder, isPending: updatePending } = useUpdateOrder();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [originalCartHash, setOriginalCartHash] = useState('');
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);

  const { data } = useGetOrderItemById(Number(orderId));

  const isPending = createPending || updatePending;

  useEffect(() => {
    setTimeout(() => {
      const id = localStorage.getItem('orderId');
      setOrderId(id);
    }, 0);
  }, []);

  // Load existing order
  useEffect(() => {
    if (!orderId || !data) {
      if (!orderId) {
        setTimeout(() => setIsOriginalLoaded(true), 0);
      }
      return;
    }

    const normalized: OrderPayloadItem[] = data.orderItems.map(
      (item: OrderItem) => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size as 1 | 2 | 3,
        note: item.note ?? '',
        number: item.number,
        sugar: item.sugar,
        coffeeLevel: item.coffeeLevel,
        ice: item.ice,
      }),
    );

    const hash = generateCartHash(normalized);

    // Wrap state updates in setTimeout to avoid cascading renders
    setTimeout(() => {
      setOriginalCartHash(hash);
      setIsOriginalLoaded(true);
    });
  }, [orderId, data]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  );

  const handleCheckout = () => {
    if (!cart.length) {
      toast.error('Cart is empty');
      return;
    }

    const payload = buildOrderPayload(cart);
    const cartHash = generateCartHash(payload.orderItems);
    const cartChanged = cartHash !== originalCartHash;

    // Update existing order
    if (orderId && isOriginalLoaded) {
      if (cartChanged) {
        updateOrder(
          { id: orderId, payload },
          {
            onSuccess: (data) => {
              toast.success('Order updated successfully');
              setOriginalCartHash(cartHash);
              router.push(`/checkout/${data.id}`);
            },
            onError: (err: Error) => toast.error(err.message),
          },
        );
        return;
      }

      // No change
      router.push(`/checkout/${orderId}`);
      return;
    }

    // Create order
    createOrder(payload, {
      onSuccess: (data) => {
        toast.success('Order created successfully');
        localStorage.setItem('orderId', data.id.toString());
        setOrderId(data.id.toString());
        setOriginalCartHash(cartHash);
        router.push(`/checkout/${data.id}`);
      },
      onError: (err: Error) => toast.error(err.message),
    });
  };

  if (!mounted) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="z-50 p-2 bg-[#f5dc50] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition cursor-pointer">
          <div className="relative text-black">
            <ShoppingCartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 text-xs font-semibold px-1.5 py-0.5 bg-black text-white rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </DialogTrigger>

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
            <div className="mt-4 space-y-4 max-h-100 overflow-y-auto pr-2">
              {cart.map((item) => (
                <OrderCard key={item.customKey} order={item} />
              ))}
            </div>

            <div className="border-t mt-6 pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex gap-4">
                <DialogClose
                  disabled={isPending}
                  className="flex-1 border rounded-xl py-3 hover:bg-gray-100 transition"
                >
                  Continue Shopping
                </DialogClose>

                <DialogClose
                  onClick={handleCheckout}
                  disabled={isPending || !isOriginalLoaded}
                  className="flex-1 bg-[#f5dc50] rounded-xl py-3 font-semibold hover:bg-[#F3D839] transition disabled:opacity-50"
                >
                  {isPending
                    ? 'Processing...'
                    : orderId
                      ? 'View Checkout'
                      : 'Checkout'}
                </DialogClose>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
