import { Category } from '@/types/api/category';

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

export const getCategories = async (): Promise<Category[]> => {
  return Promise.resolve(categories);
};
