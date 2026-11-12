# React: Behaviour

## Flow

```
Event ──► Handler ──► Store hook ──► API ──► server
                          │
Render ◄── State ◄────────┘
```

## Store Hook

```ts
// user.store.ts
export const useUser = (userId: number): UserState => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchUser(userId, controller.signal).then(setUser);
    return () => controller.abort();
  }, [userId]);

  return { user };
};
```

## Rules

| Rule | Reason |
|------|--------|
| Effects clean up (abort, unsubscribe) | No updates after unmount |
| Handlers named for the action: `handleSave` | Readable |
| State local until two components need it | Less coupling |
| Shared server data in one store hook | One source |
| Components do not call `fetch` | Layers stay clean |

## Tests

| Target | Tool | Checks |
|--------|------|--------|
| Mapper, types | Vitest | Input → output |
| Store hook | Vitest + Testing Library | State after response |
| Component | Testing Library | What the user sees |

Name = scenario + outcome. The test must fail when the behaviour breaks.
