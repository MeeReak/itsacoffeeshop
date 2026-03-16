'use client';

import { QrDialog } from '@/components/QrDialog';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    table: '',
  });

  const [qrState, setQrState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [showQr, setShowQr] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    if (!customer.name || !customer.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    // Open modal & show loading
    setShowQr(true);
    setQrState('loading');

    // Simulate API call to generate QR
    setTimeout(() => {
      // Simulate success 80% / error 20%
      const success = Math.random() < 0.8;

      if (success) {
        setQrState('idle'); // show QR
      } else {
        setQrState('error');
      }
    }, 1500);
  };

  const handlePaymentSuccess = () => {
    setQrState('success');
    clearCart();
  };

  return (
    <div className="bg-[#f8f6f1] min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* LEFT: Customer Info */}
        <section className="space-y-6">
          <div className="relative h-60 md:h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/coffee/piqsels.com-id-jxnjtdd.jpg"
              alt="menu hero"
              fill
              className="object-cover brightness-75"
            />
            <h1 className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-[#f5dc50]">
              Checkout
            </h1>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold">Your Information</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#f5dc50] outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={(e) =>
                setCustomer((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-[#f5dc50] outline-none"
            />
            <input
              type="text"
              placeholder="Table Number / Pickup"
              value={customer.table}
              onChange={(e) =>
                setCustomer((prev) => ({ ...prev, table: e.target.value }))
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
        <section className="flex flex-col bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="flex-1 overflow-y-auto space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  {item.src && (
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  )}
                  <span className="font-medium">
                    {item.name} x{item.qty}
                  </span>
                </div>
                <span className="font-semibold">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition"
          >
            Pay with QR
          </button> */}
          <QrDialog />
        </section>
      </div>
    </div>
  );
}
