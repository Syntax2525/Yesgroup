import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html'
})
export class Footer {
  readonly lang = inject(LanguageService);
  readonly site = SITE;
  readonly year = new Date().getFullYear();

  readonly divisions = computed(() => [
    {
      label: this.lang.t('home.division.fertilizer.title'),
      search: this.lang.t('home.division.fertilizer.search')
    },
    {
      label: this.lang.t('home.division.coffee.title'),
      search: this.lang.t('home.division.coffee.search')
    },
    {
      label: this.lang.t('home.division.feed.title'),
      search: this.lang.t('home.division.feed.search')
    },
    {
      label: this.lang.t('home.division.oil.title'),
      search: this.lang.t('home.division.oil.search')
    }
  ]);
}
