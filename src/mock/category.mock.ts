import { Product } from '@/type/product';

const products: Product[] = [
  {
    id: 1,
    name: 'Latte',
    price: 2.5,
    imageUrl: '/coffee/ice-latte.jpg',
    description: 'Smooth milk coffee',
    isFeatured: true,
    displayOrder: 1,
    categoryId: 2,
  },
  {
    id: 2,
    name: 'Ice Americano',
    price: 2.5,
    imageUrl: '/coffee/americano.jpg',
    description: 'Smooth milk coffee',
    isFeatured: true,
    displayOrder: 1,
    categoryId: 2,
  },
  {
    id: 3,
    name: 'Ice Cappuccino',
    price: 2.5,
    imageUrl: '/coffee/cappuccino.jpg',
    description: 'Smooth milk coffee',
    isFeatured: true,
    displayOrder: 1,
    categoryId: 2,
  },
  {
    id: 4,
    name: 'Thnol coffee',
    price: 2.5,
    imageUrl: '/coffee/thnol-coffee.jpg',
    description: 'Smooth milk coffee',
    isFeatured: true,
    displayOrder: 1,
    categoryId: 2,
  },
  {
    id: 5,
    name: 'Latte',
    price: 2.5,
    imageUrl: '/coffee/ice-latte.jpg',
    description: 'Smooth milk coffee',
    isFeatured: false,
    displayOrder: 1,
    categoryId: 2,
  },
  {
    id: 6,
    name: 'Ice Americano',
    price: 2.5,
    imageUrl: '/coffee/americano.jpg',
    description: 'Smooth milk coffee',
    isFeatured: false,
    displayOrder: 1,
    categoryId: 2,
  },
  {
    id: 7,
    name: 'Ice Cappuccino',
    price: 2.5,
    imageUrl: '/coffee/cappuccino.jpg',
    description: 'Smooth milk coffee',
    isFeatured: false,
    displayOrder: 1,
    categoryId: 2,
  },
  {
    id: 8,
    name: 'Thnol coffee',
    price: 2.5,
    imageUrl: '/coffee/thnol-coffee.jpg',
    description: 'Smooth milk coffee',
    isFeatured: false,
    displayOrder: 1,
    categoryId: 2,
  },
];

export const getProducts = async (): Promise<Product[]> => {
  return Promise.resolve(products);
};

export const getProduct = async (id: number): Promise<Product> => {
  return Promise.resolve(products.find((p) => p.id === id)!);
};

export const getFeatureProducts = async (): Promise<Product[]> => {
  return Promise.resolve(products.filter((p) => p.isFeatured));
};
