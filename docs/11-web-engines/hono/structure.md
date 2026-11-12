# Hono: Structure

## Layout

```
src/
├── core/
│   ├── app.ts               root Hono app, middleware, onError
│   └── app.error.ts         error classes
├── entities/
│   └── user/
│       ├── user.types.ts
│       ├── user.dto.ts
│       ├── user.mapper.ts
│       ├── user.schema.ts
│       ├── user.routes.ts
│       ├── user.logic.ts
│       ├── user.repo.ts
│       └── user.test.ts
└── main.ts                  runtime entry (one per runtime)
```

## Naming

| Role | Suffix | Example |
|------|--------|---------|
| Entity | `.types.ts` | `user.types.ts` |
| Transport shape | `.dto.ts` | `user.dto.ts` |
| Conversion | `.mapper.ts` | `user.mapper.ts` |
| Zod schema | `.schema.ts` | `user.schema.ts` |
| Sub-app | `.routes.ts` | `user.routes.ts` |
| Rules | `.logic.ts` | `user.logic.ts` |
| Data | `.repo.ts` | `user.repo.ts` |

## Rules

| Rule | Reason |
|------|--------|
| `core/app.ts` mounts each entity's sub-app | One list of the API |
| `main.ts` is the only runtime-specific file | Same code on every runtime |
| Export `type AppType` for `hc` clients | Typed client |
