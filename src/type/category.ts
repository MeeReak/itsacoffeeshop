export interface Category {
  id: number;
  name: string;
  isActive: boolean;
  displayOrder: number;
}

export interface CategoryListParams {
  top: number;
  page: number;
  search?: string;
}
