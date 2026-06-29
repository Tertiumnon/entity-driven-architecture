# Basic Structure Example

> **Minimal example demonstrating entity-driven architecture fundamentals**

This example shows the foundation of entity-driven development with a single entity (User) organized using the 4-level architecture pattern.

---

## What You'll Learn

- ✅ Basic entity definition (interfaces)
- ✅ Entity service with CRUD operations (find, get, create, update, delete)
- ✅ Reusable component pattern
- ✅ Smart vs dumb component separation
- ✅ Folder collocation principle
- ✅ Error handling and loading states
- ✅ Event delegation between components

---

## Folder Structure

```
src/
├── core/                              # Level 1: Shared utilities
│   └── http/
│       └── http.service.ts            # HTTP wrapper for API calls
│
├── entities/                          # Level 2: Business logic
│   └── user/
│       ├── user.interface.ts          # Entity definition and DTOs
│       ├── user.service.ts            # Business logic (CRUD)
│       ├── user.service.spec.ts       # Unit tests (placeholder)
│       ├── user.mockup.ts             # Mock data for development
│       └── user.constant.ts           # Constants (placeholder)
│
├── components/                        # Level 3: Reusable UI
│   └── user-card/
│       ├── user-card.component.ts     # Dumb component
│       └── user-card.css              # Component styles
│
├── pages/                             # Level 4: Full pages
│   └── users/
│       ├── users.component.ts         # Smart page component
│       └── users.css                  # Page styles
│
├── main.ts                            # Application bootstrap
└── index.html                         # HTML entry point
```

**Key Points:**
- Max 3 folder levels ✓
- All related files together ✓
- Clear separation of concerns ✓

---

## Core Concepts

### Entity (User)

```typescript
// Flat domain model - no nested objects
interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
}
```

### Service (UserService)

```typescript
class UserService {
  // Find multiple (returns empty array)
  async find(filters?: Filter[]): Promise<User[]>

  // Get one (throws if not found)
  async get(id: number): Promise<User>

  // Create new
  async create(dto: UserCreateDto): Promise<User>

  // Update existing
  async update(id: number, dto: UserUpdateDto): Promise<User>

  // Delete
  async delete(id: number): Promise<boolean>
}
```

### Component Patterns

**Dumb Component** (UserCard)
- Accepts data as props
- Emits events for user actions
- No service calls
- Highly reusable

```typescript
class UserCardComponent {
  constructor(container: HTMLElement, user: User) { }
  render(): void { }
}
```

**Smart Component** (Users Page)
- Fetches data from services
- Manages state
- Coordinates child components
- One per page

```typescript
class UsersComponent {
  async init(): Promise<void> { }
  private _loadUsers(): Promise<void> { }
}
```

---

## How It Works

### 1. Bootstrap Application

```typescript
// main.ts - Creates services and initializes root component
const httpService = new HttpService('/api');
const userService = new UserService(httpService);
const usersComponent = new UsersComponent(root, userService);
await usersComponent.init();
```

### 2. Load Users

```typescript
// UsersComponent._loadUsers()
this.users = await this.userService.find();
```

### 3. Render User Cards

```typescript
// For each user, create a dumb component
users.forEach((user) => {
  const card = new UserCardComponent(container, user);
  card.render();
});
```

### 4. Handle User Actions

```typescript
// User card emits events, page handles them
container.addEventListener('user-delete', async (event) => {
  await userService.delete(event.detail.userId);
  await this._loadUsers();
  this._render();
});
```

---

## Using Mock Data

The example uses mock data by default. Users come from `user.mockup.ts`:

```typescript
const mockUsers: User[] = [
  {
    id: 1,
    email: 'alice@example.com',
    name: 'Alice Johnson',
    createdAt: new Date('2024-01-15'),
  },
  // ... more users
];
```

To use real API:
1. Update `HttpService` base URL in `main.ts`
2. Ensure API follows REST patterns (see [REST API Design](https://github.com/Tertium/know-your-entity/blob/main/docs/04-backend-patterns/rest-api-design.md))

---

## Features

✅ **List Users** - Fetch and display all users
✅ **Refresh** - Reload data from service
✅ **Delete User** - Remove user from list
✅ **Error Handling** - Show errors gracefully
✅ **Loading States** - Visual feedback during data loading
✅ **XSS Protection** - HTML escaping for user input

**Coming Soon:**
- [ ] Create new user
- [ ] Edit user
- [ ] Search/filter users

---

## Testing

The structure is ready for testing:

```typescript
// Test the service independently
describe('UserService', () => {
  test('find returns array of users', async () => {
    const service = new UserService(mockHttp);
    const users = await service.find();
    expect(Array.isArray(users)).toBe(true);
  });

  test('get throws for invalid ID', async () => {
    const service = new UserService(mockHttp);
    await expect(service.get(999)).rejects.toThrow();
  });
});

// Test components with mock data
describe('UserCardComponent', () => {
  test('renders user data correctly', () => {
    const container = document.createElement('div');
    const card = new UserCardComponent(container, mockUser);
    card.render();
    expect(container.textContent).toContain(mockUser.name);
  });
});
```

---

## Architecture Checklist

- [x] Entities are flat (no nesting in domain model)
- [x] References use IDs, not full objects
- [x] Service has standard operations (find, get, create, update, delete)
- [x] Tests/mocks/constants collocated with entity
- [x] Max 3 folder levels
- [x] Components are either smart (pages) or dumb (reusable)
- [x] File names match content and entity names
- [x] No type in variable names
- [x] Methods use clear verbs

---

## Related Documentation

**Theory:**
- [What is an Entity?](https://github.com/Tertium/know-your-entity/blob/main/docs/01-introduction/what-is-entity.md)
- [Service Layer Pattern](https://github.com/Tertium/know-your-entity/blob/main/docs/04-backend-patterns/service-layer.md)
- [Folder Structure](https://github.com/Tertium/know-your-entity/blob/main/docs/06-architecture/folder-structure.md)

**Next Examples:**
- [02-e-commerce](../02-e-commerce) - Multiple entities with relationships
- [03-blog-platform](../03-blog-platform) - Complex hierarchies
- [04-task-management](../04-task-management) - Workflow and status management

---

## Running This Example

```bash
# From repository root
npm install
npm run dev

# Open browser to http://localhost:3000/examples/01-basic-structure
```

The example uses Vite for bundling and HMR during development.

---

**Key Takeaway**: This example demonstrates that entity-driven architecture leads to clean, testable, maintainable code. Each layer has a clear responsibility, making it easy to modify or extend features.
