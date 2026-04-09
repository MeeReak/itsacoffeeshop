import { useQuery } from '@tanstack/react-query';
import { CategoryListParams, CategoryListResponse } from '@/types/api/category';
import { categoryService } from '@/service/category.service';

const useGetCategories = ({
  top = 10,
  page = 1,
  search = '',
}: CategoryListParams) => {
  const skip = top * (page - 1);

  return useQuery<CategoryListResponse>({
    queryKey: ['categories', 'list', { skip, top, search }],
    queryFn: () =>
      categoryService.getCategories({
        skip,
        top,
        search,
      }) as Promise<CategoryListResponse>,
  });
};

export { useGetCategories };
