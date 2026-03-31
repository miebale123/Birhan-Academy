# Birhan Academy Frontend

Birhan Academy is a Vue 3 single-page frontend built with Vite. The app combines a public landing page, a course browsing experience, a backend-driven course content screen, a signup form, and a course completion celebration view.

This repository currently contains the frontend only. It expects a separate backend service to be available at `http://localhost:5000` for course content and user registration.

## Quick Start

```sh
npm install
npm run dev
```

The main Vite commands available in this repo are:

- `npm run dev` to start the development server
- `npm run build` to create a production build
- `npm run preview` to preview the production build locally
- `npm run lint` to run ESLint with auto-fixes
- `npm run format` to run Prettier on `src/`

## Documentation

Project documentation lives in the [`docs/`](./docs) directory:

- [`docs/README.md`](./docs/README.md) for the docs index and naming conventions
- [`docs/product/overview.md`](./docs/product/overview.md) for the product summary and scope
- [`docs/setup/local-development.md`](./docs/setup/local-development.md) for local setup and workflow
- [`docs/architecture/application-structure.md`](./docs/architecture/application-structure.md) for the frontend structure
- [`docs/architecture/routing-and-navigation.md`](./docs/architecture/routing-and-navigation.md) for the route map and navigation behavior
- [`docs/integrations/backend-api.md`](./docs/integrations/backend-api.md) for backend expectations and payload shapes
