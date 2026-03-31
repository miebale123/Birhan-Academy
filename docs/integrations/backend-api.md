# Backend API

## Overview

The frontend integrates with a backend service hosted at `http://localhost:5000`. The API base URL is currently hard-coded in the views that use it.

## `GET /items`

Used by: `src/features/courses/views/CourseContentView.vue`

Purpose:

- load lesson or content items for the content page

Expected response shape:

```json
[
  {
    "_id": "66123456789abcdef012345",
    "name": "Introduction to Biology",
    "description": "A short overview of living systems.",
    "content": "Lesson body text goes here."
  }
]
```

Frontend assumptions:

- the response body is an array
- each item is an object
- each item includes a `name` field used in the sidebar
- `_id` may be present and is excluded from the detail view
- all other fields are rendered for the selected item

Failure behavior:

- request errors are logged to the browser console
- the page does not currently show a dedicated error state

## `POST /users`

The signup flow no longer uses the backend. It now uses a local mock API service in:

- `src/features/auth/api/services/authApi.service.js`

Mock request body:

```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "secret123",
  "userType": "freelancer"
}
```

Validation behavior:

- the terms checkbox must be checked
- the email must match a simple email pattern
- the password must be at least 8 characters

Success behavior:

- stores the new user in browser `localStorage`
- clears the form
- resets the agreement checkbox
- returns a generated mock user object

Error behavior:

- rejects duplicate email addresses
- rejects incomplete payloads
- returns errors directly from the mock service

## Integration Constraints

- There is no environment-based API configuration yet for the content backend.
- `GET /items` still depends on a backend service that allows requests from the frontend origin.
- Signup is now fully mocked on the frontend and does not require backend availability.
