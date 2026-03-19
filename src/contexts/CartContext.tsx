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
  note?: string;
  qty: number;
  customKey: string;
};

type CartContextType = {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  console.log('this is', cart);

  // Save cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: Omit<CartItem, 'customKey'>) => {
    const customKey = `${item.id}-${item.sugar}-${item.ice}-${item.coffeeLevel}-${item.note || ''}`;

    setCart((prev) => {
      const exists = prev.find((i) => i.customKey === customKey);

      if (exists) {
        return prev.map((i) =>
          i.customKey === customKey ? { ...i, qty: i.qty + item.qty } : i,
        );
      }

      return [...prev, { ...item, customKey }];
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
