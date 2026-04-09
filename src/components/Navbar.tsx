'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Client-only CartDialog to avoid hydration errors
const CartDialog = dynamic(() => import('./CartDialog'), { ssr: false });

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Home', path: '' },
    { label: 'Menu', path: 'menu' },
    { label: 'About', path: 'about' },
    { label: 'Contact', path: 'contact' },
  ];

  const renderNavLinks = () =>
    navItems.map((item) => {
      const href = `/${item.path.toLowerCase()}`;
      const isActive = pathname === href;
      const baseClass = `relative group text-base font-medium transition ${
        isActive ? 'text-[#f5dc50]' : 'text-black'
      }`;

      return (
        <Link key={item.label} href={href} className={baseClass}>
          {item.label}
          <span
            className={`absolute left-0 -bottom-1 h-0.5 bg-[#f5dc50] transition-all ${
              isActive ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </Link>
      );
    });

  return (
    <nav
      className={`fixed w-full z-50 ${pathname === '/' ? 'backdrop-blur-2xl' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {pathname !== '/' && (
            <button
              onClick={() =>
                window.history.length > 1 ? router.back() : router.push('/')
              }
              className="p-2 rounded-full bg-[#f5dc50] hover:scale-110 transition cursor-pointer"
            >
              <ArrowLeftIcon />
            </button>
          )}
          {pathname === '/' && (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#f5dc50] text-xl font-bold">
                ItsCoffeeShop
              </span>
            </Link>
          )}
        </div>

        {/* Desktop Menu */}
        {pathname === '/' && (
          <div className="hidden md:flex gap-8 text-sm">{renderNavLinks()}</div>
        )}

        {/* Always show cart */}
        {!pathname.startsWith('/checkout') && <CartDialog />}
      </div>
    </nav>
  );
}
