import { Category, CategoryListResponse } from '@/types/api/category';

const categories: Category[] = [
  {
    id: 1,
    name: 'Drink',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 2,
    name: 'Food',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 5,
    name: 'Pastry',
    displayOrder: 3,
    isActive: true,
  },
];

export const getCategories = async ({
  skip,
  top,
  search,
}: {
  skip: number;
  top: number;
  search: string;
}): Promise<CategoryListResponse> => {
  let filtered = categories;

  if (search) {
    filtered = categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const paginated = filtered.slice(skip, skip + top);

  return Promise.resolve({
    totalCount: filtered.length,
    value: paginated,
    nextLink: null,
  });
};
