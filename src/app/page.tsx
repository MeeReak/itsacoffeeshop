'use client';

import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import { FeatureCard } from '@/components/FeatureCard';
import { FeedBackCard } from '@/components/FeedBackCard';
import Navbar from '@/components/layout/Navbar';
const coffees = [
  {
    id: '1',
    name: 'Iced Latte',
    desc: 'Smooth espresso with chilled milk and ice',
    price: '$2.80',
    img: '/coffee/cappuccino.jpg',
  },
  {
    id: '2',
    name: 'Caramel Latte',
    desc: 'Rich espresso with creamy milk and caramel',
    price: '$3.20',
    img: '/coffee/latte.jpg',
  },
  {
    id: '3',
    name: 'Matcha Latte',
    desc: 'Premium matcha blended with fresh milk',
    price: '$3.50',
    img: '/coffee/americano.jpg',
  },
  {
    id: '4',
    name: 'Chocolate Frappe',
    desc: 'Icy chocolate drink topped with whipped cream',
    price: '$3.80',
    img: '/coffee/mocha.jpg',
  },
];

const testimonials = [
  {
    text: 'Best iced latte in Phnom Penh!',
    name: 'Dara S.',
    avatar: '/customers/customer1.jpg',
  },
  {
    text: 'Great place to relax and work.',
    name: 'Sokha P.',
    avatar: '/customers/customer2.jpg',
  },
  {
    text: 'Affordable coffee and amazing vibe.',
    name: 'Lina M.',
    avatar: '/customers/customer3.jpg',
  },
];
const galleryImages = [
  '/coffee/latte-art.jpg',
  '/coffee/espresso-shot.jpg',
  '/coffee/coffee-beans.jpg',
  '/coffee/barista-making-coffee.jpg',
  '/coffee/fresh-roasted-beans.jpg',
  '/coffee/coffee-shop-interior.jpg',
];

export default function Home() {
  return (
    <main className="bg-[#f8f6f1]">
      {/* HERO */}
      <Navbar />
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        <Image
          src="/coffee/cafe-shop.jpg"
          alt="coffee hero"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Fuel Your Day with Great Coffee
          </h1>
          <p className="mb-8 text-lg text-gray-200">
            Fresh coffee, cool vibes, and the perfect place to recharge in Phnom
            Penh.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-[#f5dc50] text-black px-6 py-3 rounded-lg font-semibold"
            >
              View Menu
            </Link>
            <Link
              href="/order"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED COFFEE */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Coffee
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {coffees.map((coffee) => (
            <FeatureCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>

      {/* ABOUT US */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            We believe great coffee should be simple, affordable, and enjoyable
            every day. Our café is a place where friends meet, ideas grow, and
            every cup brings a moment of energy and comfort. Whether you need a
            quick coffee or a relaxing space to hang out, we’re here for you.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-lg mb-2">Fast Service</h3>
            <p className="text-sm text-gray-500">
              Get your favorite drink quickly, perfect for busy days.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Affordable Drinks</h3>
            <p className="text-sm text-gray-500">
              Quality coffee at prices everyone can enjoy.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Modern Café</h3>
            <p className="text-sm text-gray-500">
              A stylish place to work, meet friends, or relax.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Fresh Ingredients</h3>
            <p className="text-sm text-gray-500">
              We use high-quality coffee and fresh ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Coffee Moments</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {galleryImages.map((img) => (
            <div key={img} className="relative h-64">
              <Image
                src={img}
                alt="coffee gallery"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FeedBackCard
              key={i}
              text={t.text}
              name={t.name}
              avatar={t.avatar}
            />
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-6 text-center bg-[#f5dc50]">
        <h2 className="text-3xl font-bold mb-6">Need a Coffee Break?</h2>
        <p className="mb-8">Order your favorite drink and enjoy the moment.</p>
        <Link
          href="/order"
          className="bg-[#060709] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Order Now
        </Link>
      </section>
      <Footer />
    </main>
  );
}
