# Angular: Behaviour

## Flow

```
Template ──► Component ──► Store (signals) ──► Api (HttpClient) ──► server
   ▲                              │
   └──────── signal read ─────────┘
```

## Store

```ts
// user.store.ts
@Injectable({ providedIn: 'root' })
export class UserStore {
  readonly user = signal<User | null>(null);
  readonly name = computed(() => this.user()?.name ?? '');

  constructor(private readonly api: UserApi) {}

  load(id: number): void {
    this.api.fetchUser(id).subscribe((user) => this.user.set(user));
  }
}
```

## Component

```ts
// user-card.component.ts
@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  readonly user = input.required<User>();
}
```

## Rules

| Rule | Reason |
|------|--------|
| `inject()` or constructor DI in stores | Testable |
| `input()` / `output()` signal APIs | Typed, reactive |
| `OnPush` on every component | Fewer checks |
| Unsubscribe via `takeUntilDestroyed()` | No leaks |
| Store owns HTTP results | One source |

## Tests

| Target | Tool | Checks |
|--------|------|--------|
| Mapper | Jasmine/Vitest | Input → output |
| Store | `TestBed` | Signal value after load |
| Component | `TestBed` | Rendered text |

Name = scenario + outcome.
