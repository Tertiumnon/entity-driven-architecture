# Elysia: Overview

Elysia on Bun, TypeScript. Routes are typed from their schemas (TypeBox `t`), and the Eden client gives end-to-end types. Follows the [web engines](../overview.md) shared rules.

| File | Covers |
|------|--------|
| [structure.md](structure.md) | Folders, file names, suffixes |
| [entities.md](entities.md) | Entity types, schemas, mapping |
| [behaviour.md](behaviour.md) | Routes, plugins, errors, tests |

## Request Path

```
HTTP ──► Elysia routes (schema check) ──► logic ──► repo ──► DB
             │                             │
        t.Object schema              throws AppError
             │                             │
             └──── onError plugin ◄────────┘ ──► JSON response
```

## Core Rules

| Part | File | Owns | Never |
|------|------|------|-------|
| Schema | `user.schema.ts` | `t.Object` input and output | Rules |
| Routes | `user.routes.ts` | Plugin: routes, schema, call logic | Rules, SQL |
| Logic | `user.logic.ts` | Rules, throws | Elysia context |
| Repo | `user.repo.ts` | Queries | Rules |

## Anti-Patterns

| Anti-pattern | Fix |
|--------------|-----|
| Routes without a schema | Add `t.Object` for params, body, response |
| Returning `UserRow` directly | Map to DTO |
| Manual `set.status = 404` in logic | Throw; `onError` maps it |
| Untyped `any` context | Let schemas infer types |
