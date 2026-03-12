'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold mb-4 text-[#f5dc50]">☕ 404</h1>
      <p className="text-xl md:text-2xl mb-6">
        Oops! Looks like this coffee cup is empty ☕
      </p>
      <p className="mb-8 max-w-md">
        The page you’re looking for is brewing somewhere else. Don’t worry —
        we’ll help you get back to a fresh cup!
      </p>
      <Link
        href="/"
        className="bg-[#f5dc50] text-black dark:text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Take Me Home
      </Link>
    </div>
  );
}
