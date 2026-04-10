'use client';

import Image from 'next/image';
import { Badge } from './ui/badge';
import { OrderItem } from '@/types/api/order';
import { useLookups } from '@/hooks/useLookUp';

interface CartItemProps {
  item: OrderItem;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { data: lookups } = useLookups();
  const total = item.price * item.quantity;

  console.log('CartItem render', { item, lookups });
  const iceLabel =
    lookups?.ices.find((i) => i.id === item.iceId)?.name || `Ice ${item.iceId}`;
  const sugarLabel =
    lookups?.sugars.find((s) => s.id === item.sugarId)?.name ||
    `Sugar ${item.sugarId}`;
  const levelLabel = lookups?.coffeeLevels.find(
    (l) => l.id === item.coffeeLevelId,
  )?.name;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-2xl bg-white shadow-sm hover:shadow-md transition relative">
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
          <div className="flex justify-between items-start">
            <p className="font-bold text-lg">{item.productName}</p>
            <p className="text-gray-800 font-bold text-lg">
              ${total.toFixed(2)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {item.sizeId && (
              <Badge variant="outline">
                {item.sizeId === 1
                  ? 'Small'
                  : item.sizeId === 2
                    ? 'Medium'
                    : 'Large'}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-100"
            >
              {iceLabel}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-amber-50 text-amber-700 border-amber-100"
            >
              {sugarLabel}
            </Badge>
            {levelLabel && levelLabel !== 'Normal Coffee' && (
              <Badge className="bg-[#f5dc50] text-black hover:bg-[#f5dc50] border-[#f5dc50]">
                {levelLabel}
              </Badge>
            )}
          </div>

          {item.note && (
            <div className="mt-2 p-2 bg-amber-50 rounded border border-amber-100 text-sm text-amber-900 italic">
              &quot;{item.note}&quot;
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-gray-500 text-sm font-medium">
            Qty: {item.quantity}
          </p>
          <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
            Item ID: #{item.id}
          </p>
        </div>

        {/* Optional creative icon / receipt accent */}
        {/* <div className="absolute top-2 right-2 text-gray-300 text-xs uppercase tracking-widest">
          Coffee
        </div> */}
      </div>
    </div>
  );
};
