export interface Category {
  id: number;
  name: string;
  displayOrder: number;
}

export interface CategoryListParams {
  top: number;
  page: number;
  search?: string;
}
