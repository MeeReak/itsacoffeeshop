import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#060709] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#f5dc50]">ItsCoffeeShop</h2>
          <p className="mt-3 text-sm text-gray-400">
            Fresh coffee, cool vibes, and the perfect place to recharge in Phnom
            Penh.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-gray-400 text-sm">Phnom Penh, Cambodia</p>
          <p className="text-gray-400 text-sm mt-1">+855 12 345 678</p>
          <p className="text-gray-400 text-sm mt-1">itscoffeeshop@email.com</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center text-gray-500 text-sm py-4">
        © {new Date().getFullYear()} CoffeeHouse. All rights reserved.
      </div>
    </footer>
  );
}
