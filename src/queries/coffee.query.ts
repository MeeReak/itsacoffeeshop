import { useQuery } from '@tanstack/react-query';
import { Coffee } from '@/type/coffee';

const mockCoffees: Coffee[] = [
  // {
  //   id: 1,
  //   name: 'Espresso',
  //   price: 2.5,
  //   imageUrl: '/coffee/espresso.png',
  //   description: 'Strong coffee shot',
  // },
  // {
  //   id: 2,
  //   name: 'Latte',
  //   price: 3.5,
  //   imageUrl: '/coffee/latte.png',
  //   description: 'Milk + coffee',
  // },
  // {
  //   id: 3,
  //   name: 'Cappuccino',
  //   price: 3,
  //   imageUrl: '/coffee/cappuccino.png',
  //   description: 'Foamy milk coffee',
  // },
];

const useGetCoffees = () => {
  return useQuery<Coffee[]>({
    queryKey: ['coffees'],
    queryFn: async () => {
      //   const { data } = await mAxios.get('/products');
      //   return data;
      return mockCoffees;
    },
  });
};

const useGetCoffee = (id: number) => {
  return useQuery<Coffee>({
    queryKey: ['coffee', id],
    queryFn: async () => {
      // const { data } = await mAxios.get(`/products/${id}`);
      //   return data;
      return mockCoffees.find((c) => c.id === id)!;
    },
    enabled: !!id,
  });
};

export { useGetCoffees, useGetCoffee };
