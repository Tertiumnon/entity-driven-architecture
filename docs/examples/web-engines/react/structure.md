# React: Structure

## Layout

```
src/
├── core/                    http client, router, providers
├── entities/
│   └── user/
│       ├── user.types.ts
│       ├── user.api.ts
│       ├── user.store.ts
│       ├── user.mapper.ts
│       ├── user.constants.ts
│       └── user.test.ts
├── components/
│   └── user-card/
│       ├── user-card.tsx
│       ├── user-card.module.css
│       └── user-card.test.tsx
└── pages/
    └── home/
        └── home.tsx
```

## Naming

| Thing | Rule | Example |
|-------|------|---------|
| Folder | kebab-case | `user-card/` |
| Entity folder | singular | `user/` |
| File | `{name}.{role}.{ext}` | `user.api.ts` |
| Component export | PascalCase, same words | `export const UserCard` in `user-card.tsx` |
| CSS class | Scoped by CSS Modules, BEM-like | `.user-card__name--muted` |

## Rules

| Rule | Reason |
|------|--------|
| Entity folder holds all data and logic for that entity | Find everything in one place |
| Components live in `components/`, pages in `pages/` | Clear layers |
| No barrel `index.ts` | Import from the file that defines the symbol |
| Max three folder levels under `src/` | Keeps paths readable |
