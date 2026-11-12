# Express 5: Behaviour

## Route

```ts
// user.routes.ts
export const userRoutes = Router();

userRoutes.get('/users/:id', async (req, res) => {
  const { id } = parseUserParams(req.params);
  const user = await getUser(id);
  res.json(toUserDto(user, await getTeam(user.teamId)));
});
```

## Logic

```ts
// user.logic.ts
export const getUser = async (id: number): Promise<User> => {
  const user = await findUserById(id);
  if (!user) throw new NotFoundError(`User ${id} not found`);
  return user;
};
```

## Error Mapping

| Thrown | Status | Body |
|--------|--------|------|
| `NotFoundError` | 404 | `{ error: "NOT_FOUND", message }` |
| `ValidationError` | 400 | `{ error: "VALIDATION", message }` |
| Anything else | 500 | `{ error: "INTERNAL" }`, detail logged server-side only |

## Rules

| Rule | Reason |
|------|--------|
| Input parsed by schema before logic | Trust boundary |
| Logic throws, route never decides status | One mapping |
| `repo` returns `null`; `logic` throws | Absence becomes an error once |
| No `console.log` in committed code | Use the project logger |

## Tests

| Target | Scope |
|--------|-------|
| `user.logic.ts` | Rules with a fake repo |
| `user.routes.ts` | Status and body with supertest |

Name = scenario + outcome.
