import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/api/product';
import { mAxios } from '@/lib/axios';

const useGetProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['coffees'],
    queryFn: async () => {
      const { data } = await mAxios.get('/products');
      return data;
    },
  });
};

const useGetProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['coffee', id],
    queryFn: async () => {
      const { data } = await mAxios.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// const useGetFeatureProducts = () => {
//   return useQuery<Product[]>({
//     queryKey: ['coffees'],
//     queryFn: async () => {
//       const { data } = await mAxios.get('/products');
//       return data;
//     },
//   });
// };

export { useGetProducts, useGetProduct };
