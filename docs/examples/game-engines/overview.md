# Game Engines

Same entity pattern as the web guide. Each engine has the same four files.

| Engine | Runtime | Guide |
|--------|---------|-------|
| Unity 6 (C#) | Classic (default) | [unity/](unity/overview.md) |
| Unity 6 (C#) | ECS, chosen at kickoff | [unity-ecs/](unity-ecs/overview.md) |
| Godot 4 | Classic (default) | [godot/](godot/overview.md) |

## Layers

```
Core ──► Entities ──► Systems ──► Views
boot     data         rules        display
  │                     ▲
  └──── Game loop ──────┘   (the only caller of systems)
```

Dependencies point right. Nothing calls left.

## Shared Rules

| # | Rule | Example |
|---|------|---------|
| 1 | Entities are data | `Enemy { Id, Kind, Health, Position }` |
| 2 | Rules live in systems | `EnemyMovementSystem` |
| 3 | Views only display | `EnemyView` copies `Position` |
| 4 | Numbers are config, one per kind | `Motorboat` config: health 2 |
| 5 | Reference entities by ID | `TargetId: 17`, not `Enemy Target` |
| 6 | One folder per entity, singular | `Enemy/`, not `Enemies/` |
| 7 | Pick the runtime at kickoff | Record it in the project docs |

## Runtime Choice

| Project | Runtime |
|---------|---------|
| Up to a few hundred entities | Classic |
| Thousands of simulated entities at once | ECS (Unity only) |
| Godot, any size | Classic (no built-in ECS) |

Mapping across engines:

| Concept | Unity | Godot |
|---------|-------|-------|
| Entity | Plain C# class | Scene with root script |
| Config | ScriptableObject asset | `Resource` `.tres` |
| Component | Separate system or view | Child node with script |
| Event | C# event | Signal |
| Shared service | Registry in `Core/` | Autoload in `core/` |
