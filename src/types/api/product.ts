import { PaginatedResponse } from './pagination';

export interface Product {
  id: number;
  name: string;
  displayOrder: number;
  categoryId: number;
  price: number;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface ProductListParams {
  top?: number;
  page?: number;
  search?: string;
  categoryId?: number;
}

export type ProductListResponse = PaginatedResponse<Product>;
