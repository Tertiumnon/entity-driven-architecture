# Unity ECS: Overview

ECS runtime for Unity, built on the Entities package (`com.unity.entities`). Chosen at kickoff for projects with thousands of simulated entities. Same [shared rules](../overview.md) and the same [Unity](../unity/overview.md) folder and naming rules.

## Mapping

| Classic | ECS |
|---------|-----|
| `Enemy` class | `EnemyHealth`, `EnemyPosition` (`IComponentData`) |
| `Id` | `Entity` handle; `int Id` kept for saves |
| `EnemyMovementSystem` | `ISystem` with `[BurstCompile]` |
| `EnemyConfig` asset | Baked into components by an authoring pair |
| `EnemyView` | Authoring MonoBehaviour, or managed view system |
| `EnemyDestroyed` event | Component or buffer read by a later system |
| `EnemySave` | Unchanged: same flat save type |

## Folder

```
Enemy/
├── EnemyHealth.cs            IComponentData
├── EnemyPosition.cs          IComponentData
├── EnemyMovementSystem.cs    ISystem
└── EnemyAuthoring.cs         authoring + baker
```

## Costs

| Cost | Effect |
|------|--------|
| Baking | Two representations per entity kind |
| Unmanaged data only | No strings, no class refs in components |
| Burst | Cannot step through; debug with Burst off |
| Learning curve | Weeks for a classic-Unity team |

Plan for these at kickoff.

## Rules

| Rule | Reason |
|------|--------|
| Components are blittable | Burst and jobs require it |
| Reference entities by `Entity` or `int` ID | No managed references |
| One authoring + baker per kind | Designers author, baker bakes |
| Save type stays classic | Saves never depend on storage layout |
| Entities version matches Unity release | Compatibility |
| Profile during prototyping | Confirm the entity count early |
