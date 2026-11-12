# Express 5: Overview

Express 5, TypeScript, Node.js. Express 5 forwards rejected promises from async handlers to error middleware, so handlers need no `try/catch`. Follows the [web engines](../overview.md) shared rules.

| File | Covers |
|------|--------|
| [structure.md](structure.md) | Folders, file names, suffixes |
| [entities.md](entities.md) | Entity types, DTOs, repo rows |
| [behaviour.md](behaviour.md) | Routes, logic, errors, tests |

## Request Path

```
HTTP ──► middleware ──► routes ──► logic ──► repo ──► DB
                          │          │
                        schema    throws AppError
                          │
                    error middleware ──► JSON response
```

## Core Rules

| Part | File | Owns | Never |
|------|------|------|-------|
| Route | `user.routes.ts` | Parse input, call logic, respond | Rules, SQL |
| Logic | `user.logic.ts` | Rules, throws `AppError` | `req`, `res` |
| Repo | `user.repo.ts` | Queries | Rules |
| Mapper | `user.mapper.ts` | Entity ↔ DTO | I/O |
| Error middleware | `core/` | Error → status | Rules |

## Anti-Patterns

| Anti-pattern | Fix |
|--------------|-----|
| `req` passed into logic | Pass plain values |
| `res.status(404)` in logic | Throw `NotFoundError` |
| Route with SQL | Move to repo |
| `try/catch` that swallows errors | Let it throw to error middleware |
