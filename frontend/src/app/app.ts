import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { LanguageService } from './core/language.service';
import type { TranslationKey } from './core/translations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly lang = inject(LanguageService);

  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ),
    { initialValue: null }
  );

  constructor() {
    effect(() => {
      this.navigationEnd();
      this.lang.language();
      this.title.setTitle(
        `${this.lang.t(this.titleKey(this.router.url))} | ${this.lang.t('brand.name')}`
      );
    });
  }

  private titleKey(url: string): TranslationKey {
    const path = url.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');

    if (path === '') {
      return 'pageTitle.home';
    }

    if (path === 'products') {
      return 'pageTitle.products';
    }

    if (path.startsWith('products/')) {
      return 'pageTitle.product';
    }

    if (path === 'about') {
      return 'pageTitle.about';
    }

    if (path === 'contact') {
      return 'pageTitle.contact';
    }

    return 'pageTitle.notFound';
  }
}
