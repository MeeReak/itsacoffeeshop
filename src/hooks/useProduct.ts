import { useQuery } from '@tanstack/react-query';
import { Product } from '@/type/product';
import { productService } from '@/service/product.service';
const useGetProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['coffees'],
    queryFn: productService.getProducts,
  });
};

export { useGetProducts };
