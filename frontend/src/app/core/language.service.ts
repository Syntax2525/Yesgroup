import { DOCUMENT } from '@angular/core';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import type { Category, Language, Product, ProductStatus } from './models';
import { translations, type TranslationKey } from './translations';

const LANGUAGE_STORAGE_KEY = 'yes-group-language';

const STATUS_KEYS: Record<ProductStatus, TranslationKey> = {
  ACTIVE: 'product.status.ACTIVE',
  INACTIVE: 'product.status.INACTIVE',
  OUT_OF_STOCK: 'product.status.OUT_OF_STOCK'
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly currentLanguage = signal<Language>(this.readStoredLanguage());

  readonly language = this.currentLanguage.asReadonly();
  readonly isEnglish = computed(() => this.currentLanguage() === 'en');

  constructor() {
    effect(() => {
      const language = this.currentLanguage();

      this.document.documentElement.lang = language;

      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      } catch {
        // Storage can be unavailable in private browsing; language still works.
      }
    });
  }

  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
  }

  toggle(): void {
    this.currentLanguage.set(this.currentLanguage() === 'en' ? 'sw' : 'en');
  }

  t(key: TranslationKey, params?: Record<string, string | number>): string {
    let text = translations[this.currentLanguage()][key] ?? key;

    if (params) {
      for (const [name, value] of Object.entries(params)) {
        text = text.replaceAll(`{${name}}`, String(value));
      }
    }

    return text;
  }

  productName(product: Product | null | undefined): string {
    if (!product) {
      return '';
    }

    return this.currentLanguage() === 'sw'
      ? product.nameSw || product.nameEn
      : product.nameEn || product.nameSw;
  }

  productDescription(product: Product | null | undefined): string {
    if (!product) {
      return '';
    }

    return this.currentLanguage() === 'sw'
      ? product.descriptionSw || product.descriptionEn || ''
      : product.descriptionEn || product.descriptionSw || '';
  }

  categoryName(category: Category | null | undefined): string {
    if (!category) {
      return '';
    }

    return this.currentLanguage() === 'sw'
      ? category.nameSw || category.nameEn
      : category.nameEn || category.nameSw;
  }

  categoryDescription(category: Category | null | undefined): string {
    if (!category) {
      return '';
    }

    return this.currentLanguage() === 'sw'
      ? category.descriptionSw || category.descriptionEn || ''
      : category.descriptionEn || category.descriptionSw || '';
  }

  statusLabel(status: ProductStatus): string {
    return this.t(STATUS_KEYS[status]);
  }

  availabilityLabel(product: Product): string {
    return product.status === 'ACTIVE' && product.stockQuantity > 0
      ? this.t('product.inStock')
      : this.t('product.outOfStock');
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat(this.currentLanguage() === 'sw' ? 'sw-TZ' : 'en-TZ', {
      style: 'currency',
      currency: 'TZS',
      maximumFractionDigits: 0
    }).format(value);
  }

  private readStoredLanguage(): Language {
    try {
      return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'sw' ? 'sw' : 'en';
    } catch {
      return 'en';
    }
  }
}
