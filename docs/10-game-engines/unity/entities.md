# Unity: Entities and Config

## Entity

```csharp
public sealed class Enemy
{
    public int Id { get; init; }
    public EnemyKind Kind { get; init; }
    public int Health { get; set; }
    public Vector2 Position { get; set; }
}
```

| Field | Rule |
|-------|------|
| `Id`, `Kind` | `init` only: identity never changes |
| `Health`, `Position` | `set`: runtime state |
| `TargetId` | Reference to another entity by ID |
| Sprite, `Transform`, animator | Not allowed: they belong to the view |

## Config: one asset per kind

```
Data/Enemies/
├── Rowboat.asset     health 1, credits 5
├── Motorboat.asset   health 2, credits 8
└── Bunker.asset      health 8, credits 60
```

```csharp
public sealed class EnemyConfig : ScriptableObject
{
    [SerializeField] int health;
    [SerializeField] int credits;
    public int Health => health;
    public int Credits => credits;
}
```

| Rule | Why |
|------|-----|
| Every field set in the asset | No hidden code defaults |
| Missing asset → throw, name the asset | Fail fast |
| Read-only at runtime | One source of truth |
| Entity keeps `Kind`, not a copy | A balance change applies everywhere |

## Save data

| Type | Holds | Rule |
|------|-------|------|
| `Enemy` | Runtime state | Never serialized directly |
| `EnemySave` | `Id`, `Kind`, `Health` | Flat primitives and IDs only |
| Mapper | Enemy ↔ save | One small method, same folder |
