# Angular: Structure

## Layout

```
src/app/
├── core/                    app config, interceptors, routes
│   └── app.routes.ts
├── entities/
│   └── user/
│       ├── user.types.ts
│       ├── user.api.ts
│       ├── user.store.ts
│       ├── user.mapper.ts
│       └── user.spec.ts
├── components/
│   └── user-card/
│       ├── user-card.component.ts
│       ├── user-card.component.html
│       └── user-card.component.spec.ts
└── pages/
    └── home/
        └── home.component.ts
```

## Naming

| Thing | Rule | Example |
|-------|------|---------|
| Folder | kebab-case; entity folder singular | `user-card/`, `user/` |
| Component | `.component.ts` (CLI name, kept) | `user-card.component.ts` |
| API, store, mapper | Role suffix | `user.api.ts`, `user.store.ts` |
| Class | PascalCase + role | `UserCard`, `UserStore`, `UserApi` |
| Tests | `.spec.ts` (CLI name, kept) | `user.spec.ts` |

## Rules

| Rule | Reason |
|------|--------|
| Standalone components, no `NgModule` | Less wiring |
| Generated files keep CLI suffixes | Tooling works |
| No barrel `index.ts` | Import from the defining file |
