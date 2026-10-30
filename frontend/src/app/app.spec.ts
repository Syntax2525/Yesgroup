import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the YES GROUP brand and main navigation', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.brand-copy strong')?.textContent).toContain('YES GROUP');
    expect(compiled.querySelectorAll('.primary-nav a').length).toBe(4);
    expect(compiled.querySelector('main#main-content')).toBeTruthy();
  });

  it('should render a skip link for keyboard users', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const skipLink = compiled.querySelector('.skip-link');

    expect(skipLink?.getAttribute('href')).toBe('#main-content');
    expect(skipLink?.textContent).toContain('Skip to content');
  });
});
