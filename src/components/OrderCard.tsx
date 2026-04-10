import { useCart } from '@/contexts/CartContext';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { CartItem } from '@/types/ui/cart';
import { useLookups } from '@/hooks/useLookUp';

interface OrderCardProp {
  order: CartItem;
}

export const OrderCard = ({ order }: OrderCardProp) => {
  const { decreaseQty, increaseQty, removeItem } = useCart();
  const [scaleQty, setScaleQty] = useState(false);
  const { data: lookups } = useLookups();

  const changeQty = () => {
    setScaleQty(true);
    setTimeout(() => setScaleQty(false), 100); // animation duration
  };
  const itemTotal = order.price * order.qty;

  const iceLabel =
    lookups?.ices.find((i) => i.id === order.ice)?.name || `Ice ${order.ice}`;
  const sugarLabel =
    lookups?.sugars.find((s) => s.id === order.sugar)?.name ||
    `Sugar ${order.sugar}`;
  const levelLabel = lookups?.coffeeLevels.find(
    (l) => l.id === order.coffeeLevel,
  )?.name;

  return (
    <div className="flex items-center gap-4 p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
      {/* Coffee Image */}
      <div className="relative w-20 h-20 shrink-0">
        <Image
          src={order.src}
          alt={order.alt}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      {/* Item Info */}
      <div className="flex-1">
        <p className="font-semibold">{order.name}</p>

        {/* Customization */}
        <div className="flex flex-wrap gap-2 mt-1">
          {order.size && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
              {order.size === 1
                ? 'Small'
                : order.size === 2
                  ? 'Medium'
                  : 'Large'}
            </Badge>
          )}

          <Badge
            variant="secondary"
            className="text-[10px] px-1.5 py-0 h-5 bg-blue-50 text-blue-700 border-blue-100"
          >
            {iceLabel}
          </Badge>

          <Badge
            variant="secondary"
            className="text-[10px] px-1.5 py-0 h-5 bg-amber-50 text-amber-700 border-amber-100"
          >
            {sugarLabel}
          </Badge>

          {levelLabel && levelLabel !== 'Normal Coffee' && (
            <Badge className="text-[10px] px-1.5 py-0 h-5 bg-[#f5dc50] text-black hover:bg-[#f5dc50]">
              {levelLabel}
            </Badge>
          )}
        </div>

        {/* {order.note && (
          <p className="text-[10px] text-gray-500 mt-1 italic truncate max-w-37.5">
            &quot;{order.note}&quot;
          </p>
        )} */}

        <p className="text-sm text-gray-500 mt-1">${order.price.toFixed(2)}</p>
      </div>

      {/* Quantity + Total */}
      <div className="flex flex-col items-end gap-5">
        {/* Quantity */}
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => {
              changeQty();
              decreaseQty(order.customKey);
            }}
            className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
          >
            <MinusIcon size={16} />
          </button>

          <span
            className={`min-w-6 text-center text-sm ${scaleQty ? 'scale-110' : 'scale-100'}`}
          >
            {order.qty}
          </span>

          <button
            onClick={() => {
              changeQty();
              increaseQty(order.customKey);
            }}
            className="px-2 py-1 hover:bg-gray-100  cursor-pointer"
          >
            <PlusIcon size={16} />
          </button>
        </div>

        {/* Item Total */}
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">${itemTotal.toFixed(2)}</p>

          <button
            onClick={() => removeItem(order.customKey)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <Trash2Icon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
