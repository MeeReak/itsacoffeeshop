import Image from 'next/image';
import { CustomizeDialog } from './CustomizeDialog';
import { Product } from '@/type/product';

interface FeatureCardProp {
  product: Product;
}

export const FeatureCard = ({ product }: FeatureCardProp) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
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
          <CustomizeDialog coffee={product} />
        </div>
      </div>
    </div>
  );
};
