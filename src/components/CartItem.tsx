'use client';

import Image from 'next/image';
import { Badge } from './ui/badge';
import { OrderItem } from '@/types/api/order';

interface CartItemProps {
  item: OrderItem;
}

export const CartItem = ({ item }: CartItemProps) => {
  const total = item.price * item.quantity;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-2xl bg-white shadow-md hover:shadow-lg transition relative">
      {/* Image */}
      {item.productDetails.imageUrl && (
        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
          <Image
            src={item.productDetails.imageUrl}
            alt={item.productName}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <p className="font-bold text-lg">{item.productName}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {item.size && (
              <Badge className="bg-gray-100 text-gray-800">
                {item.size === 1 ? 'Small' : item.size === 2 ? 'Medium' : 'Large'}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-3 md:mt-0">
          <p className="text-gray-600 font-medium">Qty: {item.quantity}</p>
          <p className="text-gray-800 font-semibold text-lg">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Optional creative icon / receipt accent */}
      <div className="absolute top-2 right-2 text-gray-300 text-xs uppercase tracking-widest">
        Coffee
      </div>
    </div>
  );
};
