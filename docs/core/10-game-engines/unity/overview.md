# Unity: Overview

Classic runtime, default for every Unity project. Follows the [shared rules](../overview.md). ECS variant: [unity-ecs](../unity-ecs/overview.md).

| File | Covers |
|------|--------|
| [structure.md](structure.md) | Folders, file names, suffixes |
| [entities.md](entities.md) | Entity data, config assets, save data |
| [behaviour.md](behaviour.md) | Systems, views, events, tests |

## Core Rules

| Part | Owns | Never |
|------|------|-------|
| Entity (`class`) | Values for its purpose | `MonoBehaviour`, `Transform`, sprites |
| System (`class`) | Rules, one job | Static state, `Time.deltaTime` |
| View (`MonoBehaviour`) | Display of one entity | Numbers, rules, `Find` |
| Config (`ScriptableObject`) | Tuning values | Runtime writes |
| Core (`Core/`) | Order of the game loop | Entity logic |

## Anti-Patterns

| Anti-pattern | Fix |
|--------------|-----|
| One partial class with all rules | One folder per entity, one system per job |
| Rules in `Update()` of a view | Rule in a system; view calls it |
| `GameObject.Find` in gameplay | Registry lookup by ID |
| Number typed in code | Config asset field |
| `static int score` | System owns it, passed in |
| `Manager`, `Helper`, `Utils` | Name the file by its job |
