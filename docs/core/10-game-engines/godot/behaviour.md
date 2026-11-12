# Godot: Behaviour

## Flow

```
Input ──► Component ──► Root state ──► signal ──► Visuals, Score, Save
                                          │
                              (components never touch other entities)
```

## Components

```gdscript
# enemy.movement.gd
class_name EnemyMovement
extends Node

@export var enemy: Enemy

func _physics_process(delta: float) -> void:
    enemy.position += velocity() * delta
```

| Rule | Reason |
|------|--------|
| One job per component | Clear owner |
| Reference set by spawner (`@export`) | No `get_parent().get_parent()` |
| Rules in `_physics_process(delta)` | Fixed step |
| `_process` only for visuals | Separation |
| Typed variables, typed returns | Safe refactors |

## Signals

```gdscript
signal destroyed(id: int, credits: int)
```

| Rule | Reason |
|------|--------|
| Name = what happened | `destroyed`, not `update` |
| Connect in `_ready` | Known owner |
| Disconnect in `_exit_tree` if listener outlives source | No dead callbacks |
| Subscribers never change the source | One direction |

## Tests

| Kind | Tool | Scope |
|------|------|-------|
| Unit | GUT | Entities, resources, components |
| Scene | GUT | Wiring only, few |

Name = scenario + outcome. The test must fail when the behaviour breaks.
