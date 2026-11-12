# Angular: Overview

Angular 19+, TypeScript, standalone components and signals. Follows the [web engines](../overview.md) shared rules. The CLI's generic `.service.ts` is replaced by `.api.ts`, `.store.ts`, or `.logic.ts`.

| File | Covers |
|------|--------|
| [structure.md](structure.md) | Folders, file names, suffixes |
| [entities.md](entities.md) | Entity types, API types, mapping |
| [behaviour.md](behaviour.md) | Stores, components, DI, tests |

## Core Rules

| Part | File | Owns | Never |
|------|------|------|-------|
| Entity | `user.types.ts` | Flat types | Decorators |
| API | `user.api.ts` | `HttpClient` calls | Signals |
| Store | `user.store.ts` | Injectable with signals | Template logic |
| Component | `user-card.component.ts` | Render, input/output | HTTP, rules |
| Routes | `app.routes.ts` | Route table | Logic |

## Anti-Patterns

| Anti-pattern | Fix |
|--------------|-----|
| `NgModule` for each feature | Standalone components |
| `subscribe` in a component | `toSignal` in a store |
| Mutable arrays updated in place | Signals with new values |
| `Default` change detection everywhere | `OnPush` plus signals |
