# Hono: Behaviour

## Route Sub-App

```ts
// user.routes.ts
export const userRoutes = new Hono().get(
  '/:id',
  zValidator('param', UserParams),
  async (c) => {
    const { id } = c.req.valid('param');
    const user = await getUser(id);
    return c.json(toUserDto(user, await getTeam(user.teamId)));
  },
);
```

## Root App and Errors

```ts
// core/app.ts
export const app = new Hono()
  .route('/users', userRoutes)
  .onError((error, c) => {
    if (error instanceof NotFoundError) return c.json({ error: 'NOT_FOUND', message: error.message }, 404);
    return c.json({ error: 'INTERNAL' }, 500);
  });

export type AppType = typeof app;
```

## Rules

| Rule | Reason |
|------|--------|
| Validator on every input | Trust boundary |
| `c.req.valid(...)` for typed input | No casts |
| One `onError` in `core/` | One status mapping |
| `hc<AppType>` for clients | Typed calls |

## Tests

| Target | Tool | Checks |
|--------|------|--------|
| Logic | Vitest | Rules with fake repo |
| Routes | `app.request('/users/1')` | Status and body |

Name = scenario + outcome.
