# Unity: Behaviour

## Flow

```
Input ──► View ──► System ──► Registry
                     │
                     └── event ──► View, Score, Save
```

## Systems

```csharp
public sealed class EnemyMovementSystem
{
    readonly EnemyRegistry registry;
    public EnemyMovementSystem(EnemyRegistry registry) => this.registry = registry;

    public void Update(float deltaTime)
    {
        foreach (Enemy enemy in registry.All)
            enemy.Position += Velocity(enemy) * deltaTime;
    }
}
```

| Rule | Reason |
|------|--------|
| One job per system | Clear owner |
| Dependencies in constructor, max 3 | Testable |
| Time passed as argument | No `Time.deltaTime` |
| Random injected, seeded | Reproducible tests |
| Only `Core/` calls `Update` | One update order |
| Functions ≤ 15 lines | Readable |

## Views

```csharp
public sealed class EnemyView : MonoBehaviour
{
    Enemy enemy;
    public void Bind(Enemy boundEnemy) => enemy = boundEnemy;
    void LateUpdate() => transform.position = enemy.Position;
}
```

| Rule | Reason |
|------|--------|
| Created by spawner | One creator |
| Read state, send input only | One direction |
| Subscribe `OnEnable`, unsubscribe `OnDisable` | No leaks |
| Pool when spawned often (`ObjectPool<T>`) | No GC spikes |
| No `Find` | Explicit wiring |

## Events

| Event | Carries | Subscribers |
|-------|---------|-------------|
| `EnemyDestroyed` | `Id`, `Credits` | View, Score, Save |

Events carry facts. Subscribers react and never change the source.

## Tests

| Kind | Scope | Scene |
|------|-------|-------|
| EditMode | Entities, systems, registries | No |
| PlayMode | Views, scene wiring | Yes |

```csharp
[Test]
public void RemovesEnemyWhenHealthIsZero() { ... }
```

Name = scenario + outcome. The test must fail when the behaviour breaks.
