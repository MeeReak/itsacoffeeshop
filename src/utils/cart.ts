import { CartItem } from '@/types/ui/cart';
import { OrderPayload, OrderPayloadItem } from '@/types/api/order';

export const createCartItemId = (
  id: number,
  sugar: string,
  ice: string,
  coffeeLevel: string,
  note?: string,
) => {
  return `${id}-s${sugar}-i${ice}-c${coffeeLevel}-n${note ?? ''}`;
};

/**
 * Generates a stable hash string for a list of order items to detect changes.
 */
export const generateCartHash = (items: OrderPayloadItem[]) => {
  return items
    .map(
      (i) =>
        `${i.productId}-${i.quantity}-${i.size}-${i.sugar}-${i.ice}-${i.coffeeLevel}-${i.note ?? ''}-${i.number}`,
    )
    .sort()
    .join('|');
};

/**
 * Transforms UI CartItems into the OrderPayload expected by the API.
 */
export const buildOrderPayload = (cart: CartItem[]): OrderPayload => {
  return {
    type: 1, // Default to Dine-in for now
    cashierId: 2, // Default cashier
    orderItems: cart.map((item) => ({
      productId: item.id,
      quantity: item.qty,
      size: item.size as 1 | 2 | 3,
      note: item.note ?? '',
      number: item.customKey,
      ice: item.ice,
      sugar: item.sugar,
      coffeeLevel: item.coffeeLevel,
    })),
  };
};
