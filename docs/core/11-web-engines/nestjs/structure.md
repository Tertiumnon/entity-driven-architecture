# NestJS: Structure

## Layout

```
src/
├── core/
│   ├── app.error.ts          error classes
│   └── app.filter.ts         exception filter, one place for status mapping
├── entities/
│   └── user/
│       ├── user.types.ts
│       ├── user.dto.ts
│       ├── user.mapper.ts
│       ├── user.module.ts
│       ├── user.controller.ts
│       ├── user.logic.ts
│       ├── user.repo.ts
│       └── user.spec.ts
├── app.module.ts             imports entity modules
└── main.ts                   bootstrap
```

## Naming

| Role | Suffix | Example |
|------|--------|---------|
| Entity | `.types.ts` | `user.types.ts` |
| Transport shape | `.dto.ts` | `user.dto.ts` |
| Conversion | `.mapper.ts` | `user.mapper.ts` |
| Module | `.module.ts` (kept) | `user.module.ts` |
| Controller | `.controller.ts` (kept) | `user.controller.ts` |
| Rules | `.logic.ts` (replaces `.service.ts`) | `user.logic.ts` |
| Data | `.repo.ts` | `user.repo.ts` |
| Tests | `.spec.ts` (kept) | `user.spec.ts` |

## Rules

| Rule | Reason |
|------|--------|
| One module per entity | Entity folder = Nest module |
| `app.module.ts` only imports modules | No providers there |
| Exception filter in `core/` | One status mapping |
