import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CategoryService, isProductStatus, ProductService } from '../../core/catalog.service';
import { LanguageService } from '../../core/language.service';
import type { Category, Pagination, Product, ProductStatus } from '../../core/models';
import { ProductCard } from '../../shared/product-card/product-card';

const PAGE_SIZE = 9;

@Component({
  selector: 'app-products-page',
  imports: [RouterLink, ProductCard],
  templateUrl: './products.html'
})
export class ProductsPage implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchInput$ = new Subject<string>();
  private requestSequence = 0;

  readonly lang = inject(LanguageService);

  readonly products = signal<Product[]>([]);
  readonly pagination = signal<Pagination | null>(null);
  readonly categories = signal<Category[]>([]);
  readonly categoriesError = signal(false);
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly search = signal('');
  readonly categoryId = signal<number | null>(null);
  readonly status = signal<ProductStatus | ''>('');
  readonly page = signal(1);

  readonly hasActiveFilters = computed(
    () => this.search().trim() !== '' || this.categoryId() !== null || this.status() !== ''
  );

  readonly resultLabel = computed(() => {
    const total = this.pagination()?.total ?? 0;

    if (total === 1) {
      return this.lang.t('products.resultsOne');
    }

    return this.lang.t('products.results', { count: total });
  });

  readonly totalPages = computed(() => this.pagination()?.totalPages ?? 0);
  readonly hasPreviousPage = computed(() => this.pagination()?.hasPreviousPage ?? false);
  readonly hasNextPage = computed(() => this.pagination()?.hasNextPage ?? false);

  readonly pageNumbers = computed(() => {
    const totalPages = this.totalPages();
    const current = this.page();

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages: number[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    if (start > 2) {
      pages.push(-1);
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (end < totalPages - 1) {
      pages.push(-1);
    }

    pages.push(totalPages);

    return pages;
  });

  ngOnInit(): void {
    this.loadCategories();

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const search = params.get('search') ?? '';
      const rawCategory = Number(params.get('category'));
      const rawPage = Number(params.get('page'));
      const rawStatus = params.get('status');

      this.search.set(search);
      this.categoryId.set(
        Number.isInteger(rawCategory) && rawCategory > 0 ? rawCategory : null
      );
      this.status.set(isProductStatus(rawStatus) ? rawStatus : '');
      this.page.set(Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1);

      this.loadProducts();
    });

    this.searchInput$
      .pipe(debounceTime(350), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((search) => {
        this.applyQuery({ search: search || null, page: null });
      });
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
    this.searchInput$.next(value.trim());
  }

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.applyQuery({ category: value || null, page: null });
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.applyQuery({ status: value || null, page: null });
  }

  goToPage(page: number): void {
    const totalPages = this.pagination()?.totalPages ?? 0;

    if (page < 1 || page > totalPages || page === this.page()) {
      return;
    }

    this.applyQuery({ page: page === 1 ? null : page });
  }

  clearFilters(): void {
    this.applyQuery({ search: null, category: null, status: null, page: null });
  }

  retry(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    const requestId = ++this.requestSequence;

    this.loading.set(true);
    this.error.set(false);

    this.productService
      .getProducts({
        page: this.page(),
        limit: PAGE_SIZE,
        search: this.search(),
        category: this.categoryId(),
        status: this.status()
      })
      .subscribe({
        next: (response) => {
          if (requestId !== this.requestSequence) {
            return;
          }

          this.products.set(response.data);
          this.pagination.set(response.pagination);
          this.loading.set(false);
        },
        error: () => {
          if (requestId !== this.requestSequence) {
            return;
          }

          this.products.set([]);
          this.pagination.set(null);
          this.error.set(true);
          this.loading.set(false);
        }
      });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories.set(response.data);
        this.categoriesError.set(false);
      },
      error: () => {
        this.categoriesError.set(true);
      }
    });
  }

  private applyQuery(params: Record<string, string | number | null>): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}
