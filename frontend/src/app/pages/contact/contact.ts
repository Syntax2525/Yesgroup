import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-contact-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.html'
})
export class ContactPage {
  readonly lang = inject(LanguageService);
  readonly site = SITE;
  readonly submitted = signal(false);

  readonly model = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  constructor() {
    const subject = inject(ActivatedRoute).snapshot.queryParamMap.get('subject');

    if (subject) {
      this.model.subject = subject;
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const subject = this.model.subject.trim() || this.lang.t('contact.form.defaultSubject');
    const lines = [
      `${this.lang.t('contact.form.name')}: ${this.model.name.trim()}`,
      `${this.lang.t('contact.form.email')}: ${this.model.email.trim()}`
    ];

    if (this.model.phone.trim()) {
      lines.push(`${this.lang.t('contact.form.phone')}: ${this.model.phone.trim()}`);
    }

    lines.push('', this.model.message.trim());

    window.location.href = `mailto:${this.site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join('\n'))}`;

    this.submitted.set(true);
  }
}
