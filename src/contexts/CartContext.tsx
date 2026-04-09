'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { CartItem, CartContextType } from '@/types/ui/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Save cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.customKey === newItem.customKey,
      );

      if (existing) {
        return prev.map((item) =>
          item.customKey === newItem.customKey
            ? { ...item, qty: item.qty + newItem.qty }
            : item,
        );
      }

      return [...prev, newItem];
    });
  };

  const removeItem = (customKey: string) => {
    setCart((prev) => prev.filter((i) => i.customKey !== customKey));
  };

  const increaseQty = (customKey: string) => {
    setCart((prev) =>
      prev.map((i) =>
        i.customKey === customKey ? { ...i, qty: i.qty + 1 } : i,
      ),
    );
  };

  const decreaseQty = (customKey: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.customKey === customKey ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
