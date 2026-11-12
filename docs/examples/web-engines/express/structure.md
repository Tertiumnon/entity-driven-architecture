# Express 5: Structure

## Layout

```
src/
├── core/
│   ├── app.ts               express app, global middleware
│   ├── server.ts            listen, reads PORT or fails
│   ├── error.middleware.ts  AppError → status
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
```

## Naming

| Role | Suffix | Example |
|------|--------|---------|
| Entity | `.types.ts` | `user.types.ts` |
| Transport shape | `.dto.ts` | `user.dto.ts` |
| Conversion | `.mapper.ts` | `user.mapper.ts` |
| Input schema | `.schema.ts` | `user.schema.ts` |
| HTTP routes | `.routes.ts` | `user.routes.ts` |
| Rules | `.logic.ts` | `user.logic.ts` |
| Data | `.repo.ts` | `user.repo.ts` |

## Rules

| Rule | Reason |
|------|--------|
| Routers mounted in `core/app.ts` | One place lists the API |
| Forbidden names: `service`, `controller` for Express | Use the role suffixes |
| No barrel `index.ts` | Import from the defining file |
