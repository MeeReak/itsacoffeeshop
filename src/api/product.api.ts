import { getAxios } from '@/lib/axios';
import { Product } from '@/type/product';

export const getProducts = async (): Promise<Product[]> => {
  const axios = getAxios();

  const { data } = await axios.get('/products?api-version=2026-01-01');
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const axios = getAxios();

  const { data } = await axios.get(`/products/${id}`);
  return data;
};
