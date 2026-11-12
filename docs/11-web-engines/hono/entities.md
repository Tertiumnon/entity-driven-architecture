# Hono: Entities

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
import { z } from 'zod';

export const UserParams = z.object({ id: z.coerce.number().int() });
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
| `UserParams` | Route input | Validated by `zValidator` |
| `UserDto` | Response | 1 level, mapped |

Infer types from schemas with `z.infer` where input types are needed.
