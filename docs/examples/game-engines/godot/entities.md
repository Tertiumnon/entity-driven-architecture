# Godot: Entities and Config

## Scene Tree

```
Enemy (enemy.gd)          ← state
├── Sprite2D              ← view
├── EnemyMovement         ← component
└── EnemyFiring           ← component
```

## Entity state

```gdscript
class_name Enemy
extends Node2D

var id: int
var config: EnemyConfig
var health: int
```

| Field | Rule |
|-------|------|
| `id`, `config` | Set once by the spawner |
| `health` | Runtime state, typed |
| Other entities | Referenced by `id`, looked up in registry |

## Config: one resource per kind

```
enemy/enemy.config.tres      (or data/enemies/motorboat.config.tres)
```

```gdscript
class_name EnemyConfig
extends Resource

@export var health: int
@export var credits: int
```

| Rule | Why |
|------|-----|
| Every field set in the `.tres` | No hidden code defaults |
| Read-only at runtime | One source of truth |
| Entity holds a reference | Balance change applies everywhere |

## Data per layer

| Layer | Holds | Rule |
|-------|-------|------|
| Scene nodes | Visuals | No rules |
| Root script | `id`, `config`, runtime state | Typed, flat |
| Config `Resource` | Tuning values | Read-only |
