'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FeatureCard } from '@/components/FeatureCard';
import { FeatureCardSkeleton } from '@/components/FeatureCardSkeleton';
import { CategorySkeleton } from '@/components/CategorySkeleton';
import { useGetProducts } from '@/hooks/useProduct';
import { useGetCategories } from '@/hooks/useCategory';
import { Product } from '@/type/product';

interface FormValues {
  search: string;
  category: string;
}

export default function Menu() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial category from URL query
  const initialCategory = searchParams.get('query') || 'All';

  const { control } = useForm<FormValues>({
    defaultValues: { search: '', category: initialCategory },
  });

  // Use form state instead of watch() to avoid warnings
  const { errors, dirtyFields, isSubmitting } = useFormState({ control });
  const [formValues, setFormValues] = useState({
    search: '',
    category: initialCategory,
  });

  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState(formValues.search);
  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedSearch(formValues.search),
      500,
    );
    return () => clearTimeout(handler);
  }, [formValues.search]);

  // Sync category with URL
  useEffect(() => {
    if (formValues.category === 'All') {
      router.replace('/menu', { scroll: false });
    } else {
      router.replace(`/menu?query=${formValues.category.toLowerCase()}`, {
        scroll: false,
      });
    }
  }, [formValues.category, router]);

  // Fetch products
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProducts({
    top: 50,
    page: 1,
    search: debouncedSearch,
  });

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategories({
    top: 50,
    page: 1,
  });

  const products: Product[] = productsData || [];
  const categories = categoriesData || [];

  // Map categoryId -> name
  const categoryMap = new Map<number, string>();
  categories.forEach((cat) => categoryMap.set(cat.id, cat.name));

  // Filter products by selected category
  const filteredProducts = products.filter((p) => {
    if (formValues.category === 'All') return true;
    const productCategoryName = categoryMap.get(p.categoryId);
    return productCategoryName === formValues.category;
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
              placeholder="Search products..."
              value={formValues.search}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, search: e.target.value }))
              }
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f5dc50]"
            />
          )}
        />

        {/* Category Filter */}
        {isCategoriesLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="flex gap-3 flex-wrap">
            {/* All Button */}
            <button
              type="button"
              onClick={() =>
                setFormValues((prev) => ({ ...prev, category: 'All' }))
              }
              className={`cursor-pointer px-4 py-2 rounded-full font-semibold transition ${
                formValues.category === 'All'
                  ? 'bg-[#f5dc50] text-black'
                  : 'bg-white text-gray-700 shadow hover:shadow-md'
              }`}
            >
              All
            </button>

            {/* Dynamic category buttons */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  setFormValues((prev) => ({ ...prev, category: cat.name }))
                }
                className={`cursor-pointer px-4 py-2 rounded-full font-semibold transition ${
                  formValues.category === cat.name
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

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
        {isProductsError || isCategoriesError ? (
          <p className="text-center col-span-full text-red-500">
            Failed to load products or categories.
          </p>
        ) : isProductsLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <FeatureCardSkeleton key={i} />
          ))
        ) : filteredProducts.length > 0 ? (
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
