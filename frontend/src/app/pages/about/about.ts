import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-about-page',
  imports: [RouterLink],
  templateUrl: './about.html'
})
export class AboutPage {
  readonly lang = inject(LanguageService);

  readonly values = computed(() => [
    {
      title: this.lang.t('about.value.quality.title'),
      description: this.lang.t('about.value.quality.text')
    },
    {
      title: this.lang.t('about.value.integrity.title'),
      description: this.lang.t('about.value.integrity.text')
    },
    {
      title: this.lang.t('about.value.community.title'),
      description: this.lang.t('about.value.community.text')
    },
    {
      title: this.lang.t('about.value.innovation.title'),
      description: this.lang.t('about.value.innovation.text')
    }
  ]);

  readonly divisions = computed(() => [
    this.lang.t('home.division.fertilizer.title'),
    this.lang.t('home.division.coffee.title'),
    this.lang.t('home.division.feed.title'),
    this.lang.t('home.division.oil.title')
  ]);
}
