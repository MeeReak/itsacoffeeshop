import { useQuery } from '@tanstack/react-query';
import {
  Product,
  ProductListParams,
  ProductListResponse,
} from '@/types/api/product';
import { productService } from '@/service/product.service';

const useGetProducts = ({
  top = 8,
  page = 1,
  search = '',
  categoryId,
}: ProductListParams) => {
  const skip = top * (page - 1);

  return useQuery<ProductListResponse>({
    queryKey: ['products', 'list', { skip, top, search, categoryId }],
    queryFn: () => productService.getProducts({ skip, top, search, categoryId }),
  });
};

const useGetFeatureProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: () => productService.getFeatureProducts(),
  });
};

export { useGetProducts, useGetFeatureProducts };
