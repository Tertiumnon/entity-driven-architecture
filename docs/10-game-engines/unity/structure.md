# Unity: Structure

## Layout

```
Assets/<Game>/
├── Scripts/
│   ├── Runtime/
│   │   ├── Core/          boot, game loop
│   │   ├── Enemy/         one folder per entity
│   │   └── Mission/
│   ├── Editor/            editor-only tools
│   └── Tests/             mirrors Runtime/
├── Data/
│   ├── Enemies/           Motorboat.asset, Bunker.asset
│   └── Missions/
├── Scenes/   Prefabs/   Art/   Audio/   UI/   VFX/
```

## Entity Folder

```
Enemy/
├── Enemy.cs                 entity data
├── EnemyConfig.cs           config type
├── EnemyRegistry.cs         live entities, lookup by ID
├── EnemySpawner.cs          creates entities
├── EnemyMovementSystem.cs   one job
├── EnemyFiringSystem.cs     one job
└── EnemyView.cs             shows one entity
```

## Naming

| Rule | Example |
|------|---------|
| File name = type name | `Enemy.cs` holds `class Enemy` |
| PascalCase (C# type rule) | `EnemyView.cs`, not `enemy-view.cs` |
| Entity folder singular | `Enemy/` |
| Container folder may be plural | `Tests/`, `Screens/` |
| Namespace = folder path | `Runtime/Enemy/` → `Game.Enemy` |
| No partial classes for logic | Partial only for generated code |

## Role Suffixes

| Suffix | Role | Example |
|--------|------|---------|
| (none) | Entity | `Enemy` |
| `Config` | ScriptableObject type | `EnemyConfig` |
| `Registry` | Live entities by ID | `EnemyRegistry` |
| `Spawner` | Creates entities | `EnemySpawner` |
| `System` | One job | `EnemyMovementSystem` |
| `View` | Shows one entity | `EnemyView` |
| `Save` | Flat save data | `EnemySave` |

Forbidden: `Manager`, `Helper`, `Utils`.

## Tests

`Tests/Enemy/EnemyMovementSystemTests.cs` tests `Runtime/Enemy/EnemyMovementSystem.cs`.
