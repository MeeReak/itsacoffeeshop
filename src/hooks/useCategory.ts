import { useQuery } from '@tanstack/react-query';
import { Category, CategoryListParams } from '@/type/category';
import { categoryService } from '@/service/category.service';

const useGetCategories = ({
  top = 10,
  page = 1,
  search = '',
}: CategoryListParams) => {
  const skip = top * (page - 1);

  return useQuery<Category[]>({
    queryKey: ['category', 'list', { skip, top, search }],
    queryFn: () => categoryService.getCategories({ skip, top, search }),
  });
};

export { useGetCategories };
