import { useCart } from '@/contexts/CartContext';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';

interface OrderCardProp {
  order: {
    id: number;
    customKey: string;
    src: string;
    alt: string;
    name: string;
    price: number;
    qty: number;
  };
}
export const OrderCard = ({ order }: OrderCardProp) => {
  const { decreaseQty, increaseQty, removeItem } = useCart();
  return (
    <div
      key={order.id}
      className="flex items-center justify-between border rounded-lg p-4"
    >
      {/* Image + Info */}
      <div className="flex flex-1 items-center gap-4 -ml-2">
        <Image
          src={order.src}
          alt={order.name}
          width={60}
          height={60}
          className="rounded-lg "
        />

        <div>
          <p className="font-semibold">{order.name}</p>
          <p className="text-sm text-gray-500">${order.price}</p>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={() => decreaseQty(order.customKey)}
          className="p-1 border rounded cursor-pointer"
        >
          <MinusIcon size={16} />
        </button>

        <span className="w-6 text-center">{order.qty}</span>

        <button
          onClick={() => increaseQty(order.customKey)}
          className="p-1 border rounded cursor-pointer"
        >
          <PlusIcon size={16} />
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(order.customKey)}
        className="text-red-500 hover:text-red-700 pr-3 cursor-pointer"
      >
        <Trash2Icon size={20} />
      </button>
    </div>
  );
};
