# Application Structure

## App Entry Points

The frontend starts from these files:

- `src/main.js` creates and mounts the Vue app
- `src/App.vue` wraps the routed view with a shared header and footer
- `src/router/index.js` registers the route table

## Source Layout

```txt
src/
├── app/
│   ├── App.vue
│   └── router/
├── assets/
├── features/
├── main.js
├── shared/
├── styles/
└── ...
```

## Responsibility by Directory

### `src/features`

Feature-based modules:

- `home/views/HomeView.vue`
- `home/components/HomeHero.vue`
- `home/components/HomeHighlights.vue`
- `courses/views/CourseCatalogView.vue`
- `courses/views/CourseContentView.vue`
- `courses/views/CourseCompletionView.vue`
- `courses/components/CourseCard.vue`
- `courses/constants/courseCatalog.js`
- `auth/views/SignUpView.vue`

### `src/shared/components`

Reusable cross-feature UI primitives:

- `ui/UiButton.vue`
- `ui/UiInputField.vue`
- `ui/UiBadge.vue`

### `src/app/components`

Application shell components:

- `layout/AppHeader.vue`
- `layout/AppFooter.vue`

### `src/assets`

Static assets grouped by type and purpose:

- `animations/`
- `data/`
- `images/courses/`
- `images/home/`
- `images/misc/`

### `src/app/router`

Vue Router configuration for the SPA.

### `src/shared/config`

Cross-feature configuration such as API endpoints.

## Layout Model

- The header and footer are global and render on every route.
- The routed page content is injected between them with `<router-view />`.
- Most page styling is done with Tailwind utility classes plus scoped CSS for custom art direction and animation.

## Shared Components

### `AppHeader.vue`

- provides the main navigation
- links to the Home, Courses, and Sign Up routes

### `AppFooter.vue`

- provides support, legal, and social sections
- currently references several routes that do not exist yet

### `HomeHero.vue`

- renders the landing-page headline
- includes a CSS-built candle illustration
- embeds `AcademyLogo.vue`

### `HomeHighlights.vue`

- shows supporting academy messaging
- uses `vue3-lottie` and local image assets

### `CourseCard.vue`

- owns the course listing card surface for the courses feature

### `AcademyLogo.vue`

- renders the academy name in Ethiopic script with animation
- currently belongs to the home feature because it is only used there
