import Image from 'next/image';
import { CustomizeDialog } from './CustomizeDialog';
import { Product } from '@/types/api/product';
import { LookupReadDto } from '@/hooks/useLookUp';
import { CartItem } from '@/types';
import { FlameIcon } from 'lucide-react';
// import { CartItem } from '@/contexts/CartContext';

interface FeatureCardProps {
  product: Product;
  lookUp?: LookupReadDto;
  cart?: CartItem[];
}

export const FeatureCard = ({ product, lookUp, cart }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden relative group">
      {/* {product.isFeatured && (
        <div className="absolute top-3 left-3 z-10 bg-[#f5dc50] text-black px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-[#e5cc40] flex items-center gap-1">
          <span className="text-sm">★</span> Featured
        </div>
      )} */}
      <div className="relative h-56">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="20"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-black">$ {product.price}</span>
          <CustomizeDialog cart={cart} coffee={product} lookUp={lookUp} />
        </div>
      </div>

      {product.isFeatured && (
        <div className="absolute top-3 right-3 text-gray-300 text-base font-semibold tracking-widest flex gap-1">
          {/* <FlameIcon size={20} fill="#ce411f" stroke="#ce411f" />{' '} */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#d1d5dc "
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#d1d5dc "
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
          </svg>
          Popular
        </div>
      )}
    </div>
  );
};
