export interface ProductDetail {
  id: number;
  productName: string;
  price: number;
  imageUrl: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  size: number;
  note: string;
  productDetails: ProductDetail;
  ice: number;
  sugar: number;
  coffeeLevel: number;
}

export interface Order {
  id: number;
  number: string;
  type: 1 | 2; // 1: Dine-in, 2: Takeaway
  status: number;
  subTotal: number;
  tax: number;
  total: number;
  orderItems: OrderItem[];
}

export interface OrderPayloadItem {
  productId: number;
  quantity: number;
  size: 1 | 2 | 3; // 1: Small, 2: Medium, 3: Large
  note?: string;
  number: string;
  ice: number;
  sugar: number;
  coffeeLevel: number;
}

export interface OrderPayload {
  type: 1 | 2;
  cashierId: number;
  orderItems: OrderPayloadItem[];
}

export interface OrderResponse {
  id: number;
  number: string;
  total: number;
}

export interface UpdateOrder {
  id: string;
  payload: OrderPayload;
}
