'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
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
          {[
            { label: 'Home', path: '' },
            { label: 'Menu', path: 'menu' },
            { label: 'About', path: 'about' },
            { label: 'Contact', path: 'contact' },
          ].map((item) => (
            <Link
              key={item.label}
              href={`/${item.path.toLowerCase()}`}
              className="relative group hover:text-[#f5dc50] transition"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#f5dc50] group-hover:w-full transition-all dark:text-white text-black"></span>
            </Link>
          ))}
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
          {['Home', 'Menu', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-white hover:text-[#f5dc50] transition"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
