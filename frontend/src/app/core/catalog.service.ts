import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_BASE_URL } from './api-base-url';
import type {
  ApiResponse,
  Category,
  PaginatedResponse,
  Product,
  ProductQuery,
  ProductStatus
} from './models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getProducts(query: ProductQuery = {}): Observable<PaginatedResponse<Product[]>> {
    let params = new HttpParams()
      .set('page', String(query.page ?? 1))
      .set('limit', String(query.limit ?? 9));

    const search = query.search?.trim();
    if (search) {
      params = params.set('search', search);
    }

    if (typeof query.category === 'number' && query.category > 0) {
      params = params.set('category', String(query.category));
    }

    if (query.status) {
      params = params.set('status', query.status);
    }

    return this.http.get<PaginatedResponse<Product[]>>(`${this.baseUrl}/products`, {
      params
    });
  }

  getProduct(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/products/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${this.baseUrl}/categories`);
  }

  getCategory(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.baseUrl}/categories/${id}`);
  }
}

export const PRODUCT_STATUSES: ProductStatus[] = ['ACTIVE', 'INACTIVE', 'OUT_OF_STOCK'];

export function isProductStatus(value: string | null): value is ProductStatus {
  return value !== null && PRODUCT_STATUSES.includes(value as ProductStatus);
}
