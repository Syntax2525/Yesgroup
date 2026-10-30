import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import type { Language } from '../../core/models';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html'
})
export class Header {
  readonly lang = inject(LanguageService);
  readonly menuOpen = signal(false);

  readonly navLinks = computed(() => [
    { label: this.lang.t('nav.home'), path: '/' },
    { label: this.lang.t('nav.products'), path: '/products' },
    { label: this.lang.t('nav.about'), path: '/about' },
    { label: this.lang.t('nav.contact'), path: '/contact' }
  ]);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  setLanguage(language: Language): void {
    this.lang.setLanguage(language);
    this.closeMenu();
  }
}
