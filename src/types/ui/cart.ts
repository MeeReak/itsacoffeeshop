export interface CartItem {
  id: number;
  name: string;
  price: number;
  src: string;
  alt: string;
  sugar: number;
  ice: number;
  coffeeLevel: number;
  note?: string;
  qty: number;
  customKey: string;
  size: number;
  number: string;
}

export interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
}
