# Local Development

## Prerequisites

- Node.js LTS
- npm

The repository does not declare a Node `engines` field, so a recent LTS version is the safest default.

## Install Dependencies

```sh
npm install
```

## Start the Frontend

```sh
npm run dev
```

This starts the Vite development server.

## Build Commands

```sh
npm run build
npm run preview
```

- `npm run build` creates the production bundle
- `npm run preview` serves the built output locally

## Code Quality Commands

```sh
npm run lint
npm run format
```

- `npm run lint` runs ESLint with `--fix`
- `npm run format` runs Prettier on the `src/` directory

## Backend Dependency

This frontend expects a backend service at:

```txt
http://localhost:5000
```

Current backend integrations:

- `src/features/courses/views/CourseContentView.vue` requests `GET /items`

Without the backend:

- lesson content cannot load on `/courses/content`

## Signup Mock API

The signup view now uses a local mock API instead of the backend service.

- `src/features/auth/views/SignUpView.vue` calls `src/features/auth/api/services/authApi.service.js`
- mock users are stored in browser `localStorage`
- duplicate email addresses are rejected by the mock service
- backend availability is no longer required to test `/sign-up`

## Development Notes

- The canonical public routes now use lowercase, hyphenated paths such as `/sign-up`.
- Legacy aliases like `/Sign Up`, `/Courses`, and `/finishCourse` are still accepted by the router.
- If the backend origin changes, the course content API URL must be updated in the source because there is no environment-based API configuration yet.
- Start the backend before manually testing the course content page.
