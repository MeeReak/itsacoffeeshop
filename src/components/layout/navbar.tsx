'use client';

import { useCart } from '@/contexts/CartContext';
import { ArrowLeftIcon, ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const navItems = [
    { label: 'Home', path: '' },
    { label: 'Menu', path: 'menu' },
    { label: 'About', path: 'about' },
    { label: 'Contact', path: 'contact' },
  ];

  const renderNavLinks = (mobile = false) =>
    navItems.map((item) => {
      const href = `/${item.path.toLowerCase()}`;
      const isActive = pathname === href;
      const baseClass = mobile
        ? 'text-white hover:text-[#f5dc50] transition'
        : `relative group text-base font-medium transition ${
            isActive ? 'text-[#f5dc50]' : 'text-white'
          }`;

      return (
        <Link
          key={item.label}
          href={href}
          className={baseClass}
          onClick={() => mobile && setOpen(false)}
        >
          {item.label}
          {!mobile && (
            <span
              className={`absolute left-0 -bottom-1 h-0.5 bg-[#f5dc50] transition-all ${
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          )}
        </Link>
      );
    });

  return (
    <>
      {pathname === '/' ? (
        <nav className="backdrop-blur-2xl fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href={'/'} className="flex items-center gap-2">
              <Image src="/coffee-logo.jpg" alt="logo" width={40} height={40} />
              <span className="text-[#f5dc50] text-xl font-bold">
                ItsCoffeeShop
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-sm">
              {renderNavLinks()}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-[#f5dc50]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden bg-[#060709] px-6 py-4 flex flex-col gap-4">
              {renderNavLinks(true)}
            </div>
          )}
        </nav>
      ) : (
        <div>
          <Link
            href={'/'}
            className="fixed top-6 left-40 z-50 w-12 h-12 bg-[#f8f6f1] text-black rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ArrowLeftIcon />
          </Link>

          <div className="fixed top-6 right-40 z-50 w-12 h-12 bg-[#f8f6f1] text-black rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
            <div className="relative">
              <ShoppingCartIcon />
              {totalItems > 0 && (
                <span className=" absolute -top-2 -right-2 text-sm px-1.5 bg-[#f5dc50] rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
