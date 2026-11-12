# SolidJS: Behaviour

## Flow

```
Event ──► Store function ──► Signal / Resource ──► JSX
                                  │
                         API (user.api.ts)
```

## Store

```ts
// user.store.ts
export const createUserStore = (userId: () => number) => {
  const [user] = createResource(userId, (id: number) => fetchUser(id));
  return { user };
};
```

## Component

```tsx
// user-card.tsx
export const UserCard = (props: { user: User }): JSX.Element => (
  <p>{props.user.name}</p>
);
```

## Rules

| Rule | Reason |
|------|--------|
| Read props in JSX, never destructure | Keeps reactivity |
| `createResource` for server data | Built-in loading and error state |
| `onCleanup` for every listener | No leaks |
| Store factories take signals as input | Testable without a DOM |

## Tests

| Target | Tool | Checks |
|--------|------|--------|
| Mapper | Vitest | Input → output |
| Store | Vitest | Resource value after fetch |
| Component | `@solidjs/testing-library` | Rendered text |

Name = scenario + outcome.
