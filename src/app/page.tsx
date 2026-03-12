'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FeatureCard } from '@/components/FeatureCard';

const coffees = [
  {
    id: '1',
    name: 'Cappuccino',
    desc: 'Rich espresso with creamy steamed milk',
    price: '$4.50',
    img: '/coffee/cappuccino.jpg',
  },
  {
    id: '2',
    name: 'Latte',
    desc: 'Smooth espresso blended with silky milk',
    price: '$4.80',
    img: '/coffee/latte.jpg',
  },
  {
    id: '3',
    name: 'Americano',
    desc: 'Bold espresso diluted with hot water',
    price: '$3.50',
    img: '/coffee/americano.jpg',
  },
  {
    id: '4',
    name: 'Mocha',
    desc: 'Chocolate espresso topped with foam',
    price: '$5.00',
    img: '/coffee/mocha.jpg',
  },
];

const testimonials = [
  { text: 'Best coffee in town!', name: 'Sophia L.' },
  { text: 'Amazing atmosphere and delicious drinks.', name: 'Michael K.' },
  { text: 'My favorite place to start the day.', name: 'Anna W.' },
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
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        <Image
          src="/coffee/cafe-shop.jpg"
          alt="coffee hero"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Freshly Brewed Coffee Every Morning
          </h1>
          <p className="mb-8 text-lg text-gray-200">
            Experience the aroma of premium roasted beans and handcrafted
            coffee.
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
            Our coffee shop was built on passion for exceptional coffee. We
            carefully select premium beans from around the world and roast them
            to perfection. Every cup we serve is crafted with love, ensuring
            rich flavors and unforgettable moments.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-lg mb-2">Organic Beans</h3>
            <p className="text-sm text-gray-500">
              Carefully sourced organic coffee beans.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Expert Baristas</h3>
            <p className="text-sm text-gray-500">
              Skilled baristas crafting every cup.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Fresh Roasting</h3>
            <p className="text-sm text-gray-500">
              Beans roasted fresh every week.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Cozy Atmosphere</h3>
            <p className="text-sm text-gray-500">
              Relax and enjoy the perfect café vibe.
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
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="text-yellow-400 mb-3">★★★★★</p>
              <p className="text-gray-600">“ {t.text} ”</p>
              <p className="mt-2 font-semibold">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-6 text-center bg-[#f5dc50]">
        <h2 className="text-3xl font-bold mb-6">
          Ready for Your Perfect Coffee?
        </h2>
        <p className="mb-8">Visit our café or order online now!</p>
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
