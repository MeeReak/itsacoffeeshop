'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  src: string;
  alt: string;
  sugar: string;
  ice: string;
  coffeeLevel: string;
  // size: 'S' | 'M' | 'L';
  // sugar: '0%' | '25%' | '50%' | '75%' | '100%';
  // ice: 'No Ice' | 'Less Ice' | 'Normal Ice';
  // coffeeLevel?: 'Less Coffee' | 'Extra Shot';
  note?: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
};

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

  const addItem = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find(
        (i) =>
          i.id === item.id &&
          i.sugar === item.sugar &&
          i.ice === item.ice &&
          i.coffeeLevel === item.coffeeLevel,
      );

      if (exists) {
        return prev.map((i) =>
          i === exists ? { ...i, qty: i.qty + item.qty } : i,
        );
      }

      return [...prev, item];
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
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
