# Web Engines

Same entity pattern as the [web guide](../03-entity-structure/flat-entities.md) and the [game engines](../10-game-engines/overview.md). Every framework folder has the same four files.

| Framework | Side | Guide |
|-----------|------|-------|
| React 19 | Frontend | [react/](react/overview.md) |
| SolidJS | Frontend | [solidjs/](solidjs/overview.md) |
| Angular | Frontend | [angular/](angular/overview.md) |
| Express 5 | Backend | [express/](express/overview.md) |
| Elysia | Backend (Bun) | [elysia/](elysia/overview.md) |
| Hono | Backend (any runtime) | [hono/](hono/overview.md) |
| NestJS | Backend | [nestjs/](nestjs/overview.md) |

## Layers

```
Backend                              Frontend
Route ──► Logic ──► Repo ──► DB      Page ──► Component ──► Store ──► API
  │         │                                              │
  └─ DTO ◄─ Mapper ◄─ Entity                               └─ Entity types
```

Dependencies point right. Nothing calls left.

## Shared Rules

| # | Rule | Example |
|---|------|---------|
| 1 | Entities are flat types | `User { id, name, teamId }` |
| 2 | Logic lives in one file per entity | `user.logic.ts` |
| 3 | Transport is thin: parse, call logic, respond | Route handler, 3 lines |
| 4 | Map at the boundary | `user.mapper.ts`: entity ↔ DTO |
| 5 | Reference other entities by ID | `teamId: number` |
| 6 | Throw errors, map them once | `NotFoundError` → 404 |
| 7 | One folder per entity, singular | `user/`, not `users/` |
| 8 | Suffix by role | `.repo.ts`, `.logic.ts`, `.api.ts` |

## Framework Names vs Role Suffixes

| Framework name | Replaced by | Reason |
|----------------|-------------|--------|
| Angular `.service.ts` | `.api.ts` (HTTP), `.store.ts` (state), `.logic.ts` (rules) | Generic suffix is banned |
| Nest `*.service.ts` | `.logic.ts` (rules), `.repo.ts` (data) | Generic suffix is banned |
| Angular `.component.ts`, Nest `.module.ts`, `.controller.ts` | Kept | Framework tooling needs them |
| Express/Elysia/Hono routes | `.routes.ts` | Role name from the web guide |

## Anti-Patterns

| Anti-pattern | Fix |
|--------------|-----|
| Business rules in a route or component | Move to `.logic.ts` |
| Database calls in a logic file | Move to `.repo.ts` |
| Nested response objects from entities | Flatten the entity, nest only in the DTO |
| Generic `utils`, `helpers`, `manager` for many jobs | Name the file by its one job |
| Fetching data inside a view component | Call through `.api.ts` and a store |
