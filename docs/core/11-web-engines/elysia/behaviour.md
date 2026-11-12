# Elysia: Behaviour

## Route Plugin

```ts
// user.routes.ts
export const userRoutes = new Elysia({ prefix: '/users' })
  .get('/:id', async ({ params }) => {
    const user = await getUser(params.id);
    return toUserDto(user, await getTeam(user.teamId));
  }, {
    params: UserParams,
    response: UserDtoSchema,
  });
```

## Error Mapping

```ts
// core/app.ts
export const app = new Elysia()
  .onError(({ error, set }) => {
    if (error instanceof NotFoundError) {
      set.status = 404;
      return { error: 'NOT_FOUND', message: error.message };
    }
    set.status = 500;
    return { error: 'INTERNAL' };
  })
  .use(userRoutes);

export type App = typeof app;
```

## Rules

| Rule | Reason |
|------|--------|
| Schema on every route: `params`, `body`, `response` | Typed and validated |
| One `onError` in `core/` | One status mapping |
| Logic throws, never sets status | Separation |
| Eden client imports `type App` | End-to-end types, no codegen |

## Tests

| Target | Tool | Checks |
|--------|------|--------|
| Logic | `bun test` | Rules with fake repo |
| Routes | `app.handle(new Request(...))` | Status and body |

Name = scenario + outcome.
