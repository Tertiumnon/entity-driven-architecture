# NestJS: Overview

NestJS 11, TypeScript, decorators and dependency injection. One module per entity. Classes are required for controllers, modules and DI; entities and DTO shapes stay plain. Follows the [web engines](../overview.md) shared rules. The generic `*.service.ts` is replaced by `.logic.ts` and `.repo.ts`.

| File | Covers |
|------|--------|
| [structure.md](structure.md) | Folders, file names, suffixes |
| [entities.md](entities.md) | Entity types, DTO classes, mapping |
| [behaviour.md](behaviour.md) | Controllers, logic, DI, errors, tests |

## Request Path

```
HTTP ──► Guard ──► Pipe (ValidationPipe) ──► Controller ──► Logic ──► Repo ──► DB
                                                  │            │
                                            Mapper (DTO)  throws HttpException
```

## Core Rules

| Part | File | Owns | Never |
|------|------|------|-------|
| Module | `user.module.ts` | Wires the entity | Rules |
| Controller | `user.controller.ts` | Routes, DTO in and out | Rules, SQL |
| Logic | `user.logic.ts` | Rules (`@Injectable`) | HTTP types |
| Repo | `user.repo.ts` | Queries (`@Injectable`) | Rules |
| DTO | `user.dto.ts` | Validated input and output classes | Behavior |

## Anti-Patterns

| Anti-pattern | Fix |
|--------------|-----|
| `*.service.ts` for everything | `.logic.ts` and `.repo.ts` |
| One giant `AppModule` | One module per entity |
| Entity decorated with `@Entity` and used as DTO | Separate entity and DTO |
| Logic reads `@Req()` | Pass plain values |
