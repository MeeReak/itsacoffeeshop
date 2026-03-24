export interface Product {
  id: number;
  name: string;
  displayOrder: number;
  categoryId: number;
  price: number;
  imageUrl: string;
  description: string;
  isFeatured: boolean;
}

export interface ProductListParams {
  top: number;
  page: number;
  search?: string;
}
