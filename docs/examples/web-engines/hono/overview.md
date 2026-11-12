# Hono: Overview

Hono, TypeScript. Small, fast, and runs on Cloudflare Workers, Bun, Node, and Deno with the same code. Typed RPC client via `hc`. Follows the [web engines](../overview.md) shared rules.

| File | Covers |
|------|--------|
| [structure.md](structure.md) | Folders, file names, suffixes |
| [entities.md](entities.md) | Entity types, validators, mapping |
| [behaviour.md](behaviour.md) | Routes, middleware, errors, tests |

## Runtimes

| Runtime | Entry | Note |
|---------|-------|------|
| Cloudflare Workers | `export default app` | No Node APIs |
| Bun | `Bun.serve({ fetch: app.fetch })` | Same app |
| Node | `@hono/node-server` | Same app |

## Request Path

```
HTTP ──► middleware ──► route + validator ──► logic ──► repo ──► DB
                             │                  │
                       zod schema         throws AppError
                             └──── app.onError ◄┘ ──► JSON
```

## Core Rules

| Part | File | Owns | Never |
|------|------|------|-------|
| Schema | `user.schema.ts` | Zod input schemas | Rules |
| Route | `user.routes.ts` | Sub-app: validator, call logic, `c.json` | Rules, SQL |
| Logic | `user.logic.ts` | Rules | `Context` |
| Repo | `user.repo.ts` | Queries | Rules |

## Anti-Patterns

| Anti-pattern | Fix |
|--------------|-----|
| Node-only APIs in shared code | Keep to web standards |
| Business rules in middleware | Middleware for cross-cutting only |
| `c.json(row)` with DB row | Map to DTO |
| Untyped `c.req.param` | `zValidator` and `c.req.valid` |
