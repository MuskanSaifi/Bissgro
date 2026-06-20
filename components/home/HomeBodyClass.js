'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HomeBodyClass() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  useLayoutEffect(() => {
    if (isHome) {
      document.body.classList.add('home-body');
    } else {
      document.body.classList.remove('home-body');
    }
    return () => document.body.classList.remove('home-body');
  }, [isHome]);

  return null;
}
