import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ProductService } from '../../core/catalog.service';
import { LanguageService } from '../../core/language.service';
import type { Product } from '../../core/models';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-product-detail-page',
  imports: [RouterLink, ProductCard],
  templateUrl: './product-detail.html'
})
export class ProductDetailPage implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly lang = inject(LanguageService);

  readonly product = signal<Product | null>(null);
  readonly related = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly notFound = signal(false);
  readonly imageFailed = signal(false);
  private requestSequence = 0;

  readonly name = computed(() => this.lang.productName(this.product()));
  readonly description = computed(() => this.lang.productDescription(this.product()));
  readonly categoryName = computed(() => this.lang.categoryName(this.product()?.category ?? null));
  readonly statusClass = computed(() =>
    (this.product()?.status ?? 'INACTIVE').toLowerCase().replaceAll('_', '-')
  );
  readonly inStock = computed(() => {
    const product = this.product();
    return !!product && product.status === 'ACTIVE' && product.stockQuantity > 0;
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((id) => {
        this.loadProduct(id);
      });
  }

  retry(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  private loadProduct(id: number): void {
    const requestId = ++this.requestSequence;

    this.loading.set(true);
    this.error.set(false);
    this.notFound.set(false);
    this.product.set(null);
    this.related.set([]);
    this.imageFailed.set(false);

    if (!Number.isInteger(id) || id <= 0) {
      this.notFound.set(true);
      this.loading.set(false);
      return;
    }

    this.productService.getProduct(id).subscribe({
      next: (response) => {
        if (requestId !== this.requestSequence) {
          return;
        }

        this.product.set(response.data);
        this.loading.set(false);
        this.loadRelated(response.data);
      },
      error: (error: { status?: number }) => {
        if (requestId !== this.requestSequence) {
          return;
        }

        if (error.status === 404) {
          this.notFound.set(true);
        } else {
          this.error.set(true);
        }

        this.loading.set(false);
      }
    });
  }

  private loadRelated(product: Product): void {
    this.productService
      .getProducts({ page: 1, limit: 4, category: product.categoryId })
      .subscribe({
        next: (response) => {
          if (this.product()?.id !== product.id) {
            return;
          }

          this.related.set(
            response.data.filter((item) => item.id !== product.id).slice(0, 3)
          );
        },
        error: () => {
          this.related.set([]);
        }
      });
  }
}
