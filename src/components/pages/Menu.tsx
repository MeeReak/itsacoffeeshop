'use client';

import { useEffect, useState, useMemo } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
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

import { ErrorState } from '../ui/states/ErrorState';
import { EmptyState } from '../ui/states/EmptyState';

export default function Menu() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get('query') || 'All';

  const [page, setPage] = useState(1);

  const { control, setValue } = useForm<FormValues>({
    defaultValues: {
      search: '',
      category: initialCategory,
    },
  });

  const search = useWatch({ control, name: 'search' }) || '';
  const category = useWatch({ control, name: 'category' }) || initialCategory;

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useGetCategories({
    top: 100,
    page: 1,
    search: '',
  });

  const categories = useMemo(
    () => categoriesData?.value || [],
    [categoriesData],
  );

  // Find categoryId for the selected category name
  const selectedCategoryId = useMemo(() => {
    if (category.toLowerCase() === 'all') return undefined;
    return categories.find(
      (c) => c.name.toLowerCase() === category.toLowerCase(),
    )?.id;
  }, [category, categories]);

  // Reset page when searching or changing category
  useEffect(() => {
    setTimeout(() => setPage(1), 0);
  }, [debouncedSearch, selectedCategoryId]);

  // Sync category with URL
  useEffect(() => {
    if (category === 'All') {
      router.replace('/menu', { scroll: false });
    } else {
      router.replace(`/menu?query=${category.toLowerCase()}`, {
        scroll: false,
      });
    }
  }, [category, router]);

  const ITEMS_PER_PAGE = 8;

  // Fetch products with server-side filtering and pagination
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useGetProducts({
    top: ITEMS_PER_PAGE,
    page: page,
    search: debouncedSearch,
    categoryId: selectedCategoryId,
  });

  const products = productsData?.value || [];
  const totalPages = Math.ceil(
    (productsData?.totalCount || 0) / ITEMS_PER_PAGE,
  );

  const { data: lookUpData } = useLookups();

  const { cart } = useCart();

  const handleRetry = () => {
    refetchCategories();
    refetchProducts();
  };

  const clearSearch = () => {
    setValue('search', '');
    setValue('category', 'All');
  };

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
        <div className="relative flex-1">
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Search products..."
                className="w-full px-6 py-3 rounded-full border border-gray-200 focus:border-[#f5dc50] focus:outline-none focus:ring-4 focus:ring-[#f5dc50]/10 transition-all bg-white shadow-sm"
              />
            )}
          />
        </div>

        {/* Categories */}
        {isCategoriesLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setValue('category', 'All')}
              className={`cursor-pointer px-6 py-2.5 rounded-full font-bold transition-all duration-200 ${
                category === 'All'
                  ? 'bg-[#f5dc50] text-black shadow-md scale-105'
                  : 'bg-white text-gray-500 shadow-sm hover:shadow-md'
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setValue('category', cat.name)}
                className={`cursor-pointer px-6 py-2.5 rounded-full font-bold transition-all duration-200 ${
                  category.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-[#f5dc50] text-black shadow-md scale-105'
                    : 'bg-white text-gray-500 shadow-sm hover:shadow-md'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 pb-20 min-h-100">
        {isProductsError || isCategoriesError ? (
          <div className="py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            <ErrorState
              message="We couldn't load the menu items right now."
              onRetry={handleRetry}
            />
          </div>
        ) : isProductsLoading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <FeatureCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {products.map((product) => (
              <FeatureCard
                cart={cart}
                lookUp={lookUpData}
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="py-12">
            <EmptyState
              title="No products match your search"
              message={`We couldn't find anything matching in ${category}`}
              onAction={clearSearch}
            />
          </div>
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
