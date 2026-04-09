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
  const { data } = await axios.get('/products?api-version=2026-01-01', {
    params: { skip, top, search, categoryId },
  });

  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await axios.get(`/products/${id}?api-version=2026-01-01`);
  return data;
};

const getFeatureProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(
    '/products?api-version=2026-01-01&is-feature=true',
  );
  return data.value.slice(0, 4);
};

export { getFeatureProducts };
