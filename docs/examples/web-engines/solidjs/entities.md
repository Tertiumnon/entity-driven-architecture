# SolidJS: Entities

## Shapes

```
UserResponse (API, nested) ──► toUser (mapper) ──► User (flat)
```

```ts
// user.types.ts
export interface User {
  id: number;
  name: string;
  teamId: number;
}
```

```ts
// user.mapper.ts
export const toUser = (response: UserResponse): User => ({
  id: response.id,
  name: response.name,
  teamId: response.team.id,
});
```

## Store Shape

| Store | Holds | Rule |
|-------|-------|------|
| `createStore<User>` | One flat entity | No nested objects |
| `createStore<Record<number, User>>` | Entities by ID | Lookup by ID |

Links between entities are IDs (`teamId`), never objects.
