import { Category } from '@/type/category';

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
    name: 'Snack',
    displayOrder: 3,
    isActive: true,
  },
];

export const getCategories = async (): Promise<Category[]> => {
  return Promise.resolve(categories);
};
