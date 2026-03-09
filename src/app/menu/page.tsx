'use client';

import { useGetCoffees } from '@/queries/coffee.query';

export default function MenuPage() {
  const { data, isLoading } = useGetCoffees();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {data?.map((coffee) => (
        <div key={coffee.id}>{coffee.name}</div>
      ))}
    </div>
  );
}
