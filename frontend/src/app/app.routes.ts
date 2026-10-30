import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((module) => module.HomePage)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products').then((module) => module.ProductsPage)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then(
        (module) => module.ProductDetailPage
      )
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((module) => module.AboutPage)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then((module) => module.ContactPage)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((module) => module.NotFoundPage)
  }
];
