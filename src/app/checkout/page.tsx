'use client';

import { useCart } from '@/contexts/CartContext';
import { useMounted } from '@/hooks/useMounted';
import Image from 'next/image';
import { useState } from 'react';
import { CartItem } from '@/components/CartItem';
import { QrDialog } from '@/components/QrDialog';

export default function CheckoutPage() {
  const { cart } = useCart();
  const [customer, setCustomer] = useState({ name: '', phone: '', table: '' });
  const mounted = useMounted();

  if (!mounted)
    return (
      <div className="p-10 text-center text-gray-400">Loading checkout...</div>
    );

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="bg-[#f8f6f1] min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* LEFT: Customer Info */}
        <section className="space-y-6">
          <div className="relative h-60 md:h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/coffee/checkout.jpg"
              alt="checkout banner"
              fill
              className="object-cover brightness-75"
            />
            <h1 className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-[#f5dc50]">
              Checkout
            </h1>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold">Your Information</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#f5dc50] outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#f5dc50] outline-none"
            />

            <input
              type="text"
              placeholder="Table Number / Pickup"
              value={customer.table}
              onChange={(e) =>
                setCustomer({ ...customer, table: e.target.value })
              }
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#f5dc50] outline-none"
            />

            <h3 className="text-lg font-semibold mt-4">Payment Method</h3>
            <div className="flex items-center gap-3 mt-2">
              <input type="radio" name="payment" checked readOnly />
              <span className="font-medium">QR Payment</span>
            </div>
          </div>
        </section>

        {/* RIGHT: Order Summary */}
        <section className="flex flex-col bg-white justify-between rounded-xl shadow-md p-6 ">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="flex-1 overflow-y-auto space-y-3 max-h-[55vh] scrollbar-hide">
            {cart.map((item) => (
              <CartItem key={item.customKey} item={item} />
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <QrDialog />
        </section>
      </div>
    </div>
  );
}
