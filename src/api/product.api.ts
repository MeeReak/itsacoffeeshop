import { getAxios } from '@/lib/axios';
import { Product, ProductListResponse } from '@/types/api/product';

const axios = getAxios();

export const getProducts = async ({
  skip,
  top,
  search,
  categoryId,
}: {
  skip: number;
  top: number;
  search?: string;
  categoryId?: number;
}): Promise<ProductListResponse> => {
  const { data } = await axios.get('/products', {
    params: { skip, top, search, categoryId },
  });

  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await axios.get(`/products/${id}`);
  return data;
};

const getFeatureProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get('/products', {
    params: { 'is-feature': true },
  });
  return data.value.slice(0, 4);
};

export { getFeatureProducts };
