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
  sizeId: number;
  note: string;
  productDetails: ProductDetail;
  iceId: number;
  sugarId: number;
  number: string;
  coffeeLevelId: number;
}

export interface Order {
  id: number;
  number: string;
  type: 0 | 1; // 0: Takeaway, 1: Dine-in
  status: number;
  subTotal: number;
  tax: number;
  total: number;
  orderItems: OrderItem[];
}

export interface OrderPayloadItem {
  productId: number;
  quantity: number;
  sizeId: 1 | 2 | 3; // 1: Small, 2: Medium, 3: Large
  note?: string;
  number: string;
  iceLevelId: number;
  sugarLevelId: number;
  coffeeLevelId: number;
}

export interface OrderPayload {
  type: 0 | 1; // 0: Takeaway, 1: Dine-in
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
