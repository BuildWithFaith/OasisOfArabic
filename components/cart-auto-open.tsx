"use client";

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart-store';

export function CartAutoOpen() {
  const { setIsOpen } = useCartStore();

  useEffect(() => {
    // Open cart for 3 seconds on mount
    setIsOpen(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsOpen]);

  return null;
}
