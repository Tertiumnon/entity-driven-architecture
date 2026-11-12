# Godot: Overview

Classic runtime, default for every Godot project. Follows the [shared rules](../overview.md). Godot has no built-in ECS, and this guide does not add one.

| File | Covers |
|------|--------|
| [structure.md](structure.md) | Folders, file names, suffixes |
| [entities.md](entities.md) | Entity state, config resources, scene tree |
| [behaviour.md](behaviour.md) | Systems, components, signals, tests |

## Core Rules

| Part | Godot form | Owns | Never |
|------|-----------|------|-------|
| Entity | Scene, root script | State | Rules that need no state |
| Config | `Resource` `.tres` | Tuning values | Runtime writes |
| Component | Child node, script | One job | Other entities' state |
| View | Visual nodes | Display | Numbers, rules |
| Core | `core/` autoloads | Game-wide services | Entity logic |

## Anti-Patterns

| Anti-pattern | Fix |
|--------------|-----|
| One root script with all rules | Components, one job each |
| `get_node("../../..")` | Exported reference or signal |
| Autoload per entity type | Registry in `core/` |
| Rules in view `_process` | System in `_physics_process` |
| Strings for states and events | Enums and typed signals |
