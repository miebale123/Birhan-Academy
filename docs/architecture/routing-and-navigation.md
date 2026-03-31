# Routing and Navigation

## Route Map

| Path | Route Name | View File | Purpose |
| --- | --- | --- | --- |
| `/` | `home` | `src/features/home/views/HomeView.vue` | Landing page |
| `/courses` | `courseCatalog` | `src/features/courses/views/CourseCatalogView.vue` | Course browser |
| `/courses/content` | `courseContent` | `src/features/courses/views/CourseContentView.vue` | Lesson content page |
| `/courses/completion` | `courseCompletion` | `src/features/courses/views/CourseCompletionView.vue` | Completion celebration |
| `/sign-up` | `signUp` | `src/features/auth/views/SignUpView.vue` | Registration form |

## Navigation Behavior

### Header Navigation

The header exposes:

- Home
- Courses
- Sign Up

### Course Page Navigation

The course cards link to:

- `courseContent` to open lesson content
- `courseCompletion` to open the completion screen

## Route Naming Notes

- Canonical paths now use lowercase, hyphenated URL segments.
- Legacy aliases are preserved for older URLs such as `/Courses`, `/CoursesView`, `/finishCourse`, and `/Sign Up`.
- Route names are cleaner than route paths and should be preferred when navigating programmatically.

## Known Navigation Gaps

- The footer links target pages such as `/about`, `/learn_more`, `/contact_us`, and `/FAQ`, but those routes are not registered in `src/app/router/index.js`.
- There is no catch-all 404 route yet.
- There are no route guards or authentication checks in the current app.
