import { useQuery } from '@tanstack/react-query';

export function useCoffees() {
  return useQuery({
    queryKey: ['coffees'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      return res.json();
    },
  });
}
