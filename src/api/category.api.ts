import { getAxios } from '@/lib/axios';
import { CategoryListResponse } from '@/types/api/category';

export const getCategories = async ({
  skip,
  top,
  search,
}: {
  skip: number;
  top: number;
  search: string;
}): Promise<CategoryListResponse> => {
  const axios = getAxios();
  const { data } = await axios.get('/categories?api-version=2026-01-01', {
    params: {
      skip,
      top,
      search,
    },
  });
  return data;
};
