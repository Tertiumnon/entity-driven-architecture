# SolidJS: Overview

SolidJS 1.x, TypeScript, JSX. Components run once; reactivity comes from signals. Follows the [web engines](../overview.md) shared rules.

| File | Covers |
|------|--------|
| [structure.md](structure.md) | Folders, file names, suffixes |
| [entities.md](entities.md) | Entity types, stores, mapping |
| [behaviour.md](behaviour.md) | Signals, resources, components, tests |

## Core Rules

| Part | File | Owns | Never |
|------|------|------|-------|
| Entity | `user.types.ts` | Flat types | JSX, signals |
| API | `user.api.ts` | HTTP calls | Signals |
| Store | `user.store.ts` | `createResource`, signals | JSX |
| Component | `user-card.tsx` | Render | Fetch, rules |

## Anti-Patterns

| Anti-pattern | Why it breaks | Fix |
|--------------|---------------|-----|
| Destructuring props | Loses reactivity | Read `props.name` in JSX |
| `const x = signal()` read outside JSX/effect | Value frozen | Call `x()` where it is used |
| Nested object in `createStore` | Breaks flat rule | Flat store, IDs for links |
| Listener without `onCleanup` | Leaks | `onCleanup` in the owner |
