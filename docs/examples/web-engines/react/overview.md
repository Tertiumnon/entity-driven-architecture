# React: Overview

React 19, TypeScript, function components only. Follows the [web engines](../overview.md) shared rules.

| File | Covers |
|------|--------|
| [structure.md](structure.md) | Folders, file names, suffixes |
| [entities.md](entities.md) | Entity types, API types, mapping |
| [behaviour.md](behaviour.md) | Stores, components, events, tests |

## Core Rules

| Part | File | Owns | Never |
|------|------|------|-------|
| Entity | `user.types.ts` | Flat data types | JSX, hooks |
| API | `user.api.ts` | HTTP calls, returns entities | State, rendering |
| Store | `user.store.ts` | Hooks for shared state | JSX |
| Component | `user-card.tsx` | Render one thing | Fetching, rules |
| Page | `pages/home/home.tsx` | Compose components | Business rules |

## Anti-Patterns

| Anti-pattern | Fix |
|------|-----|
| `useEffect` to compute derived data | Compute during render or `useMemo` |
| Fetch inside a component | `user.api.ts` + store hook |
| Index as `key` on changing lists | Use entity `id` |
| Global state for one component | `useState` local |
| Prop drilling five levels | Store hook or context |
