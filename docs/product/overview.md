# Product Overview

## Purpose

Birhan Academy is a Vue 3 frontend for a student learning experience. The app currently presents:

- a public landing page
- a course browsing page
- a backend-driven course content page
- a signup form
- a course completion celebration screen

## Primary User Journey

1. A visitor arrives on `/`.
2. The visitor browses courses on `/courses`.
3. The visitor opens lesson content on `/courses/content`.
4. The visitor can register on `/sign-up`.
5. The visitor can reach `/courses/completion` after completing a course.

## Technology Stack

- Vue 3 Single File Components
- Vite 6
- Vue Router 4
- Tailwind CSS 4
- Component-scoped CSS for custom visuals
- `axios` for lesson content requests
- `fetch` for signup submission
- `vue3-lottie` for animation on the landing page

## Repository Scope

Included in this repository:

- the frontend application
- route configuration
- shared components and page views
- static media and animation assets

Not included in this repository:

- the backend server
- authentication/session handling
- a database
- automated tests
- deployment configuration

## Current Implementation Notes

- Legacy route aliases are still supported for older paths such as `/Courses` and `/Sign Up`.
- The footer contains links to routes that are not defined in the router.
- `pinia` and `gsap` are installed but not currently used in the rendered application.
