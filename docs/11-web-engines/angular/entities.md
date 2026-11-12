# Angular: Entities

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

## Rules

| Type | Holds | Nesting |
|------|-------|---------|
| `User` | Flat entity for the UI | None |
| `UserResponse` | API payload | 1 level |
| Mapper | Conversion | None |

Components receive `User`. Templates never read `UserResponse`.
