import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import type { Product } from '../../core/models';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html'
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly imageFailed = signal(false);
  readonly lang = inject(LanguageService);

  readonly name = computed(() => this.lang.productName(this.product()));
  readonly description = computed(() => this.lang.productDescription(this.product()));
  readonly categoryName = computed(() => this.lang.categoryName(this.product().category));
  readonly statusClass = computed(() =>
    this.product().status.toLowerCase().replaceAll('_', '-')
  );
}
