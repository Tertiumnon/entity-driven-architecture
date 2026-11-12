# Elysia: Entities

## Shapes and Schemas

```ts
// user.types.ts
export interface User {
  id: number;
  name: string;
  teamId: number;
}
```

```ts
// user.schema.ts
export const UserParams = t.Object({ id: t.Numeric() });

export const UserDtoSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  team: t.Object({ id: t.Number(), name: t.String() }),
});
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

| Item | Holds | Rule |
|------|-------|------|
| `User` | Entity | Flat |
| `UserDtoSchema` | Response schema | Same shape as `UserDto` |
| `UserParams` | Route input | Validated before logic |

The schema is the single source for the DTO type: `typeof UserDtoSchema.static`.
