# Godot: Structure

## Layout

```
res://
├── core/                    boot, game loop, autoloads
├── entities/
│   └── enemy/
│       ├── enemy.tscn       entity scene
│       ├── enemy.gd         entity logic, class_name Enemy
│       ├── enemy.config.tres
│       └── enemy.movement.gd   component
├── data/
│   └── enemies/             shared configs
├── screens/                 one folder per screen
│   ├── title/
│   └── hangar/
└── tests/                   mirrors entities/
```

## Entity Folder

```
enemy/
├── enemy.tscn               scene: root + visuals + components
├── enemy.gd                 state
├── enemy.config.tres        config resource
├── enemy.movement.gd        component
└── enemy.firing.gd          component
```

## Naming

| Rule | Example |
|------|---------|
| Folders: snake_case | `entities/enemy/` |
| Entity folder singular | `enemy/`, not `enemies/` |
| Container folder may be plural | `screens/`, `tests/` |
| File: `{entity}.{role}.{ext}` | `enemy.movement.gd` |
| Base file has no role | `enemy.gd` |
| `class_name` = PascalCase entity | `class_name Enemy` |

## Role Suffixes

| Suffix | Role | Example |
|--------|------|---------|
| (none) | Entity state | `enemy.gd` |
| `config` | Config resource | `enemy.config.tres` |
| `movement`, `firing` | Component, one job | `enemy.movement.gd` |
| `view` | Visual-only script | `enemy.view.gd` |
| `spawner` | Creates entities | `enemy.spawner.gd` |

Forbidden: `manager`, `helper`, `utils`.

## Rules

- One scene per entity, one per screen.
- A scene never loads another entity's scene; a spawner does.
- No global `res://` paths inside entity scripts except to their own folder.
