# YES GROUP — Frontend

Public corporate website for YES GROUP, built with Angular 22. The site presents the
company's four divisions (fertilizer production, coffee seedlings, animal feed and
sunflower oil) and consumes the existing Express/Prisma API for the product catalogue.

## Features

- Bilingual interface (English and Swahili) with the choice saved in `localStorage`.
- Home page with divisions, featured products, company strengths and calls to action.
- Product catalogue with debounced search, category and availability filters, pagination,
  loading skeletons and empty/error states.
- Product details page with related products and contact call to action.
- About and contact pages; the contact form opens the visitor's email client with a
  pre-filled message.
- Responsive layout, accessible navigation, skip link and reduced-motion support.
- Lazy-loaded routes and a shared global design system.

## Requirements

- Node.js 20 or newer (the project is used with Node 24 on Windows).
- The YES GROUP API running at `http://localhost:5000`.

## Development

Install dependencies once:

```bash
npm install
```

Start the API from the `backend` directory (in a separate terminal):

```bash
npm start
```

Then start the frontend:

```bash
npm start
```

Open `http://localhost:4200`. The development server proxies every `/api` request to
`http://localhost:5000` using `proxy.conf.json`, so no CORS configuration is needed
locally.

## Production build

```bash
npm run build
```

Build output is written to `dist/frontend`. In production, serve the generated files and
route `/api` to the backend on the same origin. `API_BASE_URL` is configured in
`src/app/app.config.ts`.

## Tests

```bash
npm test -- --watch=false
```

## Project structure

```
src/app/
  core/        API client, models, translations, language and site configuration
  layout/      Header and footer
  pages/       Home, products, product detail, about, contact, not found
  shared/      Reusable product card
src/styles.css Global design system and responsive styles
proxy.conf.json Development API proxy
```

## Before publishing

- Replace the placeholder email address and phone number in
  `src/app/core/site.config.ts`.
- Confirm the office address and working hours shown on the contact page.
- Set real product image URLs through the API; the interface shows a branded fallback
  when an image is missing.
- Configure the production web server to fall back to `index.html` for client-side
  routes and to proxy `/api` to the backend.
