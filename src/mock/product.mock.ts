import { Product, ProductListResponse } from '@/types/api/product';

const coffee: Product[] = [
  {
    id: 10,
    name: 'Iced Thnol Coffee',
    price: 2.43,
    imageUrl: '/coffee/thnol-coffee.jpg',
    description:
      'Iced Thnol Coffee is an iced milk coffee and a Cambodian flavor, rich aroma, sweet and creamy taste, unforgettable taste',
    isFeatured: true,
    displayOrder: 1,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 11,
    name: 'Iced Latte',
    price: 2.43,
    imageUrl: '/coffee/ice-latte.jpg',
    description:
      'Iced Latte is a fresh milk coffee with a light, creamy coffee flavor and the aroma of coffee and fresh milk',
    isFeatured: true,
    displayOrder: 2,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 12,
    name: 'Iced Americano',
    price: 2.43,
    imageUrl: '/coffee/ice-americano.jpg',
    description:
      'Iced Americano is a black coffee with a strong coffee flavor and the aroma of coffee',
    isFeatured: true,
    displayOrder: 3,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 13,
    name: 'Fresh Passion Juice',
    price: 2.43,
    imageUrl: '/coffee/fresh-passio-juice.jpg',
    description:
      'Fresh Passion Juice has a sweet and sour taste and the aroma of fresh passion fruit',
    isFeatured: true,
    displayOrder: 4,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 14,
    name: 'Coconut Cream Latte',
    price: 2.43,
    imageUrl: '/coffee/coconut-cream-latte.jpg',
    description:
      'Coconut Cream Latte is a creamy coffee with fresh coconut water, a sweet taste, light coffee level, and the aroma of coffee and coconut',
    isFeatured: false,
    displayOrder: 5,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 15,
    name: 'Iced Cappuccino',
    price: 2.65,
    imageUrl: '/coffee/ice-cappuccino.jpg',
    description:
      'Iced Cappuccino is a chilled coffee drink with rich espresso, creamy milk foam, and a smooth balanced flavor',
    isFeatured: true,
    displayOrder: 6,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 16,
    name: 'Green Milk Tea',
    price: 2.35,
    imageUrl: '/coffee/green-milk-tea.jpg',
    description:
      'Green Milk Tea blends fragrant green tea with creamy milk for a smooth, refreshing, and lightly sweet drink',
    isFeatured: false,
    displayOrder: 7,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 17,
    name: 'Chocolate Milk',
    price: 2.3,
    imageUrl: '/coffee/chocolate-milk.jpg',
    description:
      'Chocolate Milk is a rich and creamy drink made with fresh milk and smooth chocolate flavor',
    isFeatured: false,
    displayOrder: 8,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 18,
    name: 'Iced Mocha',
    price: 2.7,
    imageUrl: '/coffee/ice-mocha.jpg',
    description:
      'Iced Mocha combines espresso, chocolate syrup, and milk over ice for a rich and refreshing coffee treat',
    isFeatured: true,
    displayOrder: 9,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 19,
    name: 'Wildberry Raspberry Tea',
    price: 2.5,
    imageUrl: '/coffee/wildberry-raspberry-tea.jpg',
    description:
      'Wildberry Raspberry Tea is a fruity iced tea with a refreshing blend of berries and raspberry flavors',
    isFeatured: false,
    displayOrder: 10,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 20,
    name: 'Honey Yuzu Soda',
    price: 2.55,
    imageUrl: '/coffee/honey-yuzu-soda.jpg',
    description:
      'Honey Yuzu Soda is a sparkling citrus drink with sweet honey and refreshing yuzu flavor',
    isFeatured: true,
    displayOrder: 11,
    categoryId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 21,
    name: 'Pastry Mix',
    price: 3.2,
    imageUrl: '/pastry/pastry-mix.jpg',
    description:
      'A delightful assortment of freshly baked pastries, perfect for any occasion.',
    isFeatured: false,
    displayOrder: 1,
    categoryId: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 22,
    name: 'Mini Croissant',
    price: 1.8,
    imageUrl: '/pastry/mini-croissant.jpg',
    description:
      'Flaky and buttery mini croissants, perfect as a light snack or breakfast treat.',
    isFeatured: false,
    displayOrder: 2,
    categoryId: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 23,
    name: 'Mini Chocolate Tin',
    price: 2.1,
    imageUrl: '/pastry/mini-chocolate-tin.jpg',
    description:
      'Mini chocolate tins filled with rich chocolate, perfect for chocolate lovers.',
    isFeatured: false,
    displayOrder: 3,
    categoryId: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 24,
    name: 'Mini Almond Croissant',
    price: 2.5,
    imageUrl: '/pastry/mini-almond-croissant.jpg',
    description:
      'Delicious mini almond croissants with a sweet almond filling and flaky crust.',
    isFeatured: true,
    displayOrder: 4,
    categoryId: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 25,
    name: 'Mini Raisin Roll',
    price: 2.0,
    imageUrl: '/pastry/mini-raisin-roll.jpg',
    description:
      'Soft and sweet mini raisin rolls, perfect for a light snack or coffee pairing.',
    isFeatured: false,
    displayOrder: 5,
    categoryId: 5,
    createdAt: new Date().toISOString(),
  },
];

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
  let filtered = coffee;

  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (categoryId) {
    filtered = filtered.filter((p) => p.categoryId === categoryId);
  }

  const paginated = filtered.slice(skip, skip + top);

  return Promise.resolve({
    totalCount: filtered.length,
    value: paginated,
    nextLink: null,
  });
};

export const getProduct = async (id: number): Promise<Product> => {
  return Promise.resolve(coffee.find((p) => p.id === id)!);
};

export const getFeatureProducts = async (): Promise<Product[]> => {
  return Promise.resolve(coffee.filter((p) => p.isFeatured).slice(0, 4));
};
