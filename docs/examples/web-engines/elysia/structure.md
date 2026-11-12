# Elysia: Structure

## Layout

```
src/
├── core/
│   ├── app.ts               Elysia app, plugins, onError
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
└── index.ts                 entry point only (allowed: runnable)
```

## Naming

| Role | Suffix | Example |
|------|--------|---------|
| Entity | `.types.ts` | `user.types.ts` |
| Transport shape | `.dto.ts` | `user.dto.ts` |
| Conversion | `.mapper.ts` | `user.mapper.ts` |
| `t` schema | `.schema.ts` | `user.schema.ts` |
| Plugin with routes | `.routes.ts` | `user.routes.ts` |
| Rules | `.logic.ts` | `user.logic.ts` |
| Data | `.repo.ts` | `user.repo.ts` |

## Rules

| Rule | Reason |
|------|--------|
| Each entity exports one Elysia plugin | Compose with `.use` |
| `src/index.ts` is the only runnable entry | No barrel exports |
| Eden type export from `core/app.ts` | Clients import the type |
