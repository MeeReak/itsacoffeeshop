export enum PaymentMethod {
  KHQR = 1,
}

export enum PaymentCurrency {
  USD = 0,
  KHR = 1,
}

export enum PaymentStatus {
  PENDING = 0,
  SUCCESS = 1,
  FAILED = 2,
}

export interface CheckoutPayload {
  method: PaymentMethod;
  currency: PaymentCurrency;
}

export interface CheckoutResponse {
  id: number;
  amount: number;
  method: PaymentMethod;
  currency: PaymentCurrency;
  qr: string;
  expireAt: string;
}

export interface PaymentStatusResponse {
  status: PaymentStatus;
}
