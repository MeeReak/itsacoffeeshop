import { getAxios } from '@/lib/axios';
import { Category } from '@/type/category';

export const getCategories = async ({
  skip,
  top,
  search,
}: {
  skip: number;
  top: number;
  search: string;
}): Promise<Category[]> => {
  const axios = getAxios();
  const { data } = await axios.get('/categories?api-version=2026-01-01', {
    params: {
      skip,
      top,
      search,
    },
  });
  return data.value;
};
