'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { FeatureCard } from '@/components/FeatureCard';
import { useGetProducts } from '@/hooks/useProduct';
import { Product } from '@/type/product';

interface FormValues {
  search: string;
  category: string;
}

const categories = ['All', 'Coffee', 'Tea', 'Frappes'];

export default function MenuPage() {
  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: { search: '', category: 'All' },
  });

  const search = watch('search');
  const selectedCategory = watch('category');

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useGetProducts({
    top: 20,
    page: 1,
    search: debouncedSearch,
  });

  const products: Product[] = data || [];

  // Filter by category
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.name === selectedCategory; // adjust per API
  });

  return (
    <main className="bg-[#f8f6f1] min-h-[110vh]">
      {/* HERO */}
      <section className="relative h-64 flex items-center justify-center text-center text-white mb-12">
        <Image
          src="/coffee/menu-coffee.jpg"
          alt="menu hero"
          fill
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-[#f5dc50]">
          Our Menu
        </h1>
      </section>

      {/* Search + Category Filter */}
      <section className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Search coffee..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f5dc50]"
            />
          )}
        />

        {/* Category Filter */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => field.onChange(cat)}
                  className={`cursor-pointer px-4 py-2 rounded-full font-semibold transition ${
                    field.value === cat
                      ? 'bg-[#f5dc50] text-black'
                      : 'bg-white text-gray-700 shadow hover:shadow-md'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        />
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
        {isLoading ? (
          <p className="text-center col-span-full text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-center col-span-full text-red-500">
            Failed to load products.
          </p>
        ) : filteredProducts.length ? (
          filteredProducts.map((product) => (
            <FeatureCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products match your search ☹️
          </p>
        )}
      </section>
    </main>
  );
}
