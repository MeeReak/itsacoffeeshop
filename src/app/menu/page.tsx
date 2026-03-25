'use client';

import Menu from '@/components/pages/Menu';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Menu />
    </Suspense>
  );
}
