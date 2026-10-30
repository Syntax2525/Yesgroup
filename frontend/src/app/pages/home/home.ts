import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { ProductService } from '../../core/catalog.service';
import type { Product } from '../../core/models';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html'
})
export class HomePage implements OnInit {
  private readonly productService = inject(ProductService);
  readonly lang = inject(LanguageService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly divisions = computed(() => [
    {
      number: '01',
      title: this.lang.t('home.division.fertilizer.title'),
      description: this.lang.t('home.division.fertilizer.description'),
      search: this.lang.t('home.division.fertilizer.search')
    },
    {
      number: '02',
      title: this.lang.t('home.division.coffee.title'),
      description: this.lang.t('home.division.coffee.description'),
      search: this.lang.t('home.division.coffee.search')
    },
    {
      number: '03',
      title: this.lang.t('home.division.feed.title'),
      description: this.lang.t('home.division.feed.description'),
      search: this.lang.t('home.division.feed.search')
    },
    {
      number: '04',
      title: this.lang.t('home.division.oil.title'),
      description: this.lang.t('home.division.oil.description'),
      search: this.lang.t('home.division.oil.search')
    }
  ]);

  readonly reasons = computed(() => [
    {
      title: this.lang.t('home.why.quality.title'),
      description: this.lang.t('home.why.quality.description')
    },
    {
      title: this.lang.t('home.why.local.title'),
      description: this.lang.t('home.why.local.description')
    },
    {
      title: this.lang.t('home.why.supply.title'),
      description: this.lang.t('home.why.supply.description')
    },
    {
      title: this.lang.t('home.why.service.title'),
      description: this.lang.t('home.why.service.description')
    }
  ]);

  ngOnInit(): void {
    this.loadFeatured();
  }

  loadFeatured(): void {
    this.loading.set(true);
    this.error.set(false);

    this.productService.getProducts({ page: 1, limit: 3 }).subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}
