# Documentation

This project uses a category-based documentation structure under `docs/` so files are easier to find, maintain, and extend.

## Structure

```txt
docs/
├── README.md
├── architecture/
│   ├── application-structure.md
│   └── routing-and-navigation.md
├── integrations/
│   └── backend-api.md
├── product/
│   └── overview.md
└── setup/
    └── local-development.md
```

## Reading Path

1. `product/overview.md`
2. `setup/local-development.md`
3. `architecture/application-structure.md`
4. `architecture/routing-and-navigation.md`
5. `integrations/backend-api.md`

## Naming Conventions

- Folders use short lowercase category names such as `setup`, `architecture`, and `integrations`.
- Files use lowercase kebab-case names such as `local-development.md`.
- File names describe the document outcome rather than the tool or technology alone.
- New documentation should be added to the most specific category folder available instead of the `docs/` root.

## Scope

These docs cover the frontend application in this repository. They do not document the backend implementation, deployment infrastructure, or database schema because those parts are not included here.
