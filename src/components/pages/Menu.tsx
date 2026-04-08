'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FeatureCard } from '@/components/FeatureCard';
import { FeatureCardSkeleton } from '@/components/FeatureCardSkeleton';
import { CategorySkeleton } from '@/components/CategorySkeleton';
import { useGetProducts } from '@/hooks/useProduct';
import { useGetCategories } from '@/hooks/useCategory';
import { ProductPagination } from '../ProductPagination';
import { useLookups } from '@/hooks/useLookUp';
import { useCart } from '@/contexts/CartContext';

interface FormValues {
  search: string;
  category: string;
}

export default function Menu() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('query') || 'All';

  const [page, setPage] = useState(1);

  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      search: '',
      category: initialCategory,
    },
  });

  const search = watch('search');
  const category = watch('category');

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Reset page when searching
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Sync category with URL
  useEffect(() => {
    if (category === 'All') {
      router.replace('/menu', { scroll: false });
    } else {
      router.replace(`/menu?query=${category.toLowerCase()}`, {
        scroll: false,
      });
    }

    setPage(1);
  }, [category, router]);

  // Fetch products
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProducts({
    top: 100,
    page: 1,
    search: debouncedSearch,
  });

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategories({
    top: 5,
    page: 1,
  });

  const products = productsData?.value || [];
  const categories = categoriesData || [];

  // Map categoryId → category name
  const categoryMap = new Map<number, string>();
  categories.forEach((cat) => categoryMap.set(cat.id, cat.name));

  // Filter by category
  const filteredProducts = products.filter((p) => {
    if (category.toLowerCase() === 'all') return true;

    const productCategoryName = categoryMap.get(p.categoryId) ?? '';

    return productCategoryName.toLowerCase() === category.toLowerCase();
  });

  // Pagination AFTER filtering
  const paginatedProducts = filteredProducts.slice((page - 1) * 8, page * 8);

  const totalPages = Math.ceil(filteredProducts.length / 8);

  const { data: lookUpData } = useLookups();

  const { cart } = useCart();

  return (
    <main className="bg-[#f8f6f1] min-h-[110vh]">
      {/* HERO */}
      <section className="relative h-64 flex items-center justify-center text-center text-white mb-8">
        <Image
          src="/coffee/menu-coffee.jpg"
          alt="menu hero"
          fill
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white">
          Our Menu
        </h1>
      </section>

      {/* Search + Category */}
      <section className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:border-[#f5dc50] focus:outline-none focus:ring-1 focus:ring-[#f5dc50]"
            />
          )}
        />

        {/* Categories */}
        {isCategoriesLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setValue('category', 'All')}
              className={`cursor-pointer px-4 py-2 rounded-full font-semibold transition ${
                category === 'All'
                  ? 'bg-[#f5dc50] text-black'
                  : 'bg-white text-gray-700 shadow hover:shadow-md'
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setValue('category', cat.name)}
                className={`cursor-pointer px-4 py-2 rounded-full font-semibold transition ${
                  category.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-[#f5dc50] text-black'
                    : 'bg-white text-gray-700 shadow hover:shadow-md'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
        {isProductsError || isCategoriesError ? (
          <p className="text-center col-span-full text-red-500">
            Failed to load products or categories.
          </p>
        ) : isProductsLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <FeatureCardSkeleton key={i} />
          ))
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <FeatureCard
              cart={cart}
              lookUp={lookUpData}
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products match your search ☹️
          </p>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="max-w-7xl mx-auto pb-20 flex justify-center">
          <ProductPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </section>
      )}
    </main>
  );
}
