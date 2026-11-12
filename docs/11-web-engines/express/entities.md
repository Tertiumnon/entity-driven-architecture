# Express 5: Entities

## Shapes

```
UserRow (DB)  ──┐
                ├──► User (entity, flat) ──► toUserDto (mapper) ──► UserDto (JSON, 1 level)
UserRow ───────┘
```

```ts
// user.types.ts
export interface User {
  id: number;
  name: string;
  teamId: number;
}

// user.dto.ts
export interface UserDto {
  id: number;
  name: string;
  team: { id: number; name: string };
}
```

```ts
// user.mapper.ts
export const toUserDto = (user: User, team: Team): UserDto => ({
  id: user.id,
  name: user.name,
  team: { id: team.id, name: team.name },
});
```

## Rules

| Type | Holds | Nesting |
|------|-------|---------|
| `User` | Entity | Flat |
| `UserDto` | Response | 1 level |
| `UserRow` | DB columns | Flat |

Never return `UserRow` from a route; it can carry internal columns.
