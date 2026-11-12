# React: Entities

## Three Shapes, One Entity

```
UserResponse (API, nested)  ──► toUser (mapper) ──► User (entity, flat)
   { id, name, team: {id} }                          { id, name, teamId }
```

```ts
// user.types.ts
export interface User {
  id: number;
  name: string;
  teamId: number;
}

// user.types.ts
export interface UserResponse {
  id: number;
  name: string;
  team: { id: number; name: string };
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

## Rules

| Type | Holds | Nesting |
|------|-------|---------|
| `User` | What the UI needs to store | Flat |
| `UserResponse` | What the API sends | 1 level |
| Mapper | Conversion only | None |

Components receive `User`, never `UserResponse`.
