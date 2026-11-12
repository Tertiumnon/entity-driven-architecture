# SolidJS: Structure

## Layout

```
src/
├── core/                    router, providers, http client
├── entities/
│   └── user/
│       ├── user.types.ts
│       ├── user.api.ts
│       ├── user.store.ts
│       ├── user.mapper.ts
│       └── user.test.ts
├── components/
│   └── user-card/
│       ├── user-card.tsx
│       └── user-card.test.tsx
└── pages/
    └── home/
        └── home.tsx
```

## Naming

| Thing | Rule | Example |
|-------|------|---------|
| Folder | kebab-case; entity folder singular | `user-card/`, `user/` |
| File | `{name}.{role}.{ext}` | `user.store.ts` |
| Component export | PascalCase | `export const UserCard` |
| Stores | Factory named `create…Store` | `createUserStore` |

## Rules

| Rule | Reason |
|------|--------|
| Same layers as React | One mental model across frontends |
| `.tsx` for anything with JSX | Compiler knows the file |
| No barrel `index.ts` | Import from the defining file |
