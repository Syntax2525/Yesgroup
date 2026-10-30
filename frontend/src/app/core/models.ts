export type Language = 'en' | 'sw';

export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';

export interface Category {
  id: number;
  nameEn: string;
  nameSw: string;
  descriptionEn: string | null;
  descriptionSw: string | null;
  createdAt: string;
  updatedAt: string;
  productCount?: number;
  products?: Product[];
}

export interface Product {
  id: number;
  nameEn: string;
  nameSw: string;
  descriptionEn: string | null;
  descriptionSw: string | null;
  price: number;
  stockQuantity: number;
  unit: string;
  image: string | null;
  status: ProductStatus;
  categoryId: number;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: Pagination;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: number | null;
  status?: ProductStatus | '';
}

export interface SelectOption<T extends string | number> {
  label: string;
  value: T;
}
