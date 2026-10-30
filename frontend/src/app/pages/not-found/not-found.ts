import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found.html'
})
export class NotFoundPage {
  readonly lang = inject(LanguageService);
}
