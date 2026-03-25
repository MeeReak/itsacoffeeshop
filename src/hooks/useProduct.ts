import { useQuery } from '@tanstack/react-query';
import { Product, ProductListParams } from '@/type/product';
import { productService } from '@/service/product.service';

const useGetProducts = ({
  top = 10,
  page = 1,
  search = '',
}: ProductListParams) => {
  const skip = top * (page - 1);

  return useQuery<Product[]>({
    queryKey: ['products', 'list', { skip, top, search }],
    retryDelay: 5000,
    queryFn: () => productService.getProducts({ skip, top, search }),
  });
};

const useGetFeatureProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: () => productService.getFeatureProducts(),
  });
};

export { useGetProducts, useGetFeatureProducts };
