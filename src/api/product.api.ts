import { getAxios } from '@/lib/axios';
import { Product } from '@/type/product';
import { PagingResponse } from '@/utils/PagingResponse';

export const getProducts = async ({
  skip,
  top,
  search,
}: {
  skip: number;
  top: number;
  search: string;
}): Promise<PagingResponse<Product>> => {
  const axios = getAxios();

  const { data } = await axios.get('/products?api-version=2026-01-01', {
    params: { skip, top, search },
  });

  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const axios = getAxios();

  const { data } = await axios.get(`/products/${id}?api-version=2026-01-01`);
  return data;
};

const getFeatureProducts = async (): Promise<Product[]> => {
  const axios = getAxios();

  const { data } = await axios.get(
    '/products?api-version=2026-01-01&is-feature=true',
  );
  return data.value.slice(0, 4);
};

export { getFeatureProducts };
