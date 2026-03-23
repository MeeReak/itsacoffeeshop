'use client';

import { useState } from 'react';
import { FeatureCard } from '@/components/FeatureCard';
import Image from 'next/image';

const coffees = [
  {
    id: 1,
    name: 'Iced Latte',
    desc: 'Smooth espresso with chilled milk and ice',
    price: 2.8,
    img: '/coffee/cappuccino.jpg',
    category: 'Coffee',
  },
  {
    id: 2,
    name: 'Caramel Latte',
    desc: 'Rich espresso with creamy milk and caramel',
    price: 3.2,
    img: '/coffee/latte.jpg',
    category: 'Coffee',
  },
  {
    id: 3,
    name: 'Matcha Latte',
    desc: 'Premium matcha blended with fresh milk',
    price: 3.5,
    img: '/coffee/americano.jpg',
    category: 'Tea',
  },
  {
    id: 4,
    name: 'Chocolate Frappe',
    desc: 'Icy chocolate drink topped with whipped cream',
    price: 3.8,
    img: '/coffee/mocha.jpg',
    category: 'Frappes',
  },
  {
    id: 5,
    name: 'Iced Latte',
    desc: 'Smooth espresso with chilled milk and ice',
    price: 2.8,
    img: '/coffee/cappuccino.jpg',
    category: 'Coffee',
  },
  {
    id: 6,
    name: 'Caramel Latte',
    desc: 'Rich espresso with creamy milk and caramel',
    price: 3.2,
    img: '/coffee/latte.jpg',
    category: 'Coffee',
  },
  {
    id: 7,
    name: 'Matcha Latte',
    desc: 'Premium matcha blended with fresh milk',
    price: 3.5,
    img: '/coffee/americano.jpg',
    category: 'Tea',
  },
  {
    id: 8,
    name: 'Chocolate Frappe',
    desc: 'Icy chocolate drink topped with whipped cream',
    price: 3.8,
    img: '/coffee/mocha.jpg',
    category: 'Frappes',
  },
];

const categories = ['All', 'Coffee', 'Tea', 'Frappes'];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredCoffees = coffees.filter((coffee) => {
    const matchesCategory =
      selectedCategory === 'All' || coffee.category === selectedCategory;
    const matchesSearch = coffee.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
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
        {/* Search */}
        <input
          type="text"
          placeholder="Search coffee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f5dc50]"
        />

        {/* Category Filter */}
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-[#f5dc50] text-black'
                  : 'bg-white text-gray-700 shadow hover:shadow-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Coffee Grid */}
      <section className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
        {filteredCoffees.length ? (
          filteredCoffees.map((coffee) => (
            <FeatureCard key={coffee.id} coffee={coffee} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No coffee matches your search ☹️
          </p>
        )}
      </section>
    </main>
  );
}
