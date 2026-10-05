# Folder Structure: 4-Level Architecture

A consistent, scalable folder structure that organizes code by responsibility and layer.

## The Pattern

```
src/
├── core/                    ← App setup, stable contracts, configuration, shared utilities
├── entities/                ← Domain entities, models, business logic
├── components/ (or libs/)   ← Reusable components, services, middleware
└── pages/ (or routes/)      ← Application pages, routes, views
```

Each folder has a specific responsibility:

| Folder | Purpose | Contains |
|--------|---------|----------|
| **core/** | Foundation & shared contracts | App initialization, config, stable types/interfaces, shared utils |
| **entities/** | Domain models | Data entities, business logic, repositories |
| **components/** (or **libs/**) | Reusable pieces | UI components, services, utilities |
| **pages/** (or **routes/**) | Application structure | Pages, routes, views |

---

## Detailed Breakdown

### 1. Core Layer (`src/core/`)

**Purpose**: Application foundation and shared configuration.

**Contains**:
- Application initialization and bootstrap
- Global configuration
- Environment variables and settings
- Shared utilities (not entity-specific)
- Stable, high-level types and interfaces used across layers (contracts)
- Middleware and interceptors (not entity-specific)

Use contracts in `core/` when multiple layers need to agree on an abstraction. Higher-level code can depend on the contract, while an implementation in `libs/` depends on that same contract. This keeps both sides from importing each other and creating a circular dependency. Keep contracts small and independent of implementation details; don't turn `core/` into a home for entity-specific types.

**Examples**:

```
src/core/
├── app.ts                      ← App initialization
├── app.config.ts               ← App configuration
├── environment.config.ts       ← Environment setup
├── logger.config.ts            ← Logger configuration
├── database.config.ts          ← Database connection
├── index.ts                    ← Main exports
├── utils/
│   ├── date-formatter.ts
│   ├── error-handler.ts
│   ├── string-validator.ts
│   └── http-client.ts          ← Shared HTTP client (not entity-specific)
├── middleware/
│   ├── auth.middleware.ts      ← Authentication (global)
│   ├── error.middleware.ts     ← Error handling (global)
│   └── cors.middleware.ts      ← CORS configuration
├── types/
│   ├── pagination.types.ts
│   ├── sorting.types.ts
│   └── common.types.ts
├── contracts/
│   └── payment-gateway.ts     ← Stable interface used by business logic and an adapter
└── constants/
    ├── http-codes.ts
    └── app-constants.ts
```

**Key Rules**:
- ✅ Shared across multiple entities
- ✅ Put stable cross-layer contracts here when they prevent layers from importing implementations or each other
- ✅ No entity-specific logic
- ✅ Configuration and setup code
- ❌ Don't add entity-specific files here
- ❌ Don't create "utils" that only one entity uses

### Shared across the project: `core/` or `components/`?

Project-wide use alone doesn't decide the folder. Put shared definitions and behavior in `core/`; put reusable visual UI in `components/`.

For example, localization dictionaries and locale configuration belong in `core/`. A language switcher belongs in `components/` because it displays controls and handles user interaction. The component can use the localization definitions from `core/`:

```
src/
├── core/
│   └── localization/
│       ├── localization.config.ts
│       └── translations/
│           ├── en.ts
│           └── sr.ts
└── components/
    └── language-switcher/
        ├── language-switcher.tsx
        └── language-switcher.module.css
```

The dependency points from `components/` to `core/`: shared UI may consume foundational definitions, while `core/` should not depend on a particular UI component.

**Example: depend on a contract, not an integration**

```typescript
// core/contracts/payment-gateway.ts
export interface PaymentGateway {
  charge(orderId: string, amount: number): Promise<void>;
}

// entities/order/order.logic.ts
import type { PaymentGateway } from '../../core/contracts/payment-gateway';

export function createOrderLogic(paymentGateway: PaymentGateway) {
  return async (orderId: string, amount: number) => {
    await paymentGateway.charge(orderId, amount);
  };
}

// libs/stripe/stripe-payment-gateway.ts
import type { PaymentGateway } from '../../core/contracts/payment-gateway';

export class StripePaymentGateway implements PaymentGateway {
  async charge(orderId: string, amount: number): Promise<void> {
    // Call Stripe SDK here.
  }
}
```

The application bootstrap creates `StripePaymentGateway` and passes it to `createOrderLogic`. Both modules depend on the contract in `core/`; `entities/` does not import `libs/`, and `libs/` does not import `entities/`. For a contract used by only one domain, keep it with that domain instead of promoting it to `core/`.

---

### 2. Entities Layer (`src/entities/`)

**Purpose**: Domain entities and their business logic.

**Contains**:
- Entity models and interfaces
- Repositories and data access
- Business logic and services
- Validators
- Mappers and transformers
- Entity-specific constants

**Pattern**: One folder per entity, all files use the same base name.

**Examples**:

```
src/entities/
├── user/
│   ├── user.ts                 ← User interface/type
│   ├── user.repo.ts            ← Database access
│   ├── user.logic.ts           ← Business logic
│   ├── user.validator.ts       ← Validation
│   ├── user.mapper.ts          ← DTO mapping
│   ├── user.cache.ts           ← Caching
│   ├── user.constants.ts       ← User constants
│   ├── user.service.test.ts    ← Tests
│   └── index.ts                ← Exports (optional)
│
├── product/
│   ├── product.ts
│   ├── product.repo.ts
│   ├── product.logic.ts
│   ├── product.validator.ts
│   ├── product.mapper.ts
│   └── index.ts
│
├── order/
│   ├── order.ts
│   ├── order.repo.ts
│   ├── order.logic.ts
│   ├── order.manager.ts        ← Orchestrates multiple operations
│   ├── order.validator.ts
│   └── index.ts
│
└── comment/
    ├── comment.ts
    ├── comment.repo.ts
    ├── comment.logic.ts
    └── index.ts
```

**Key Rules**:
- ✅ One folder per entity
- ✅ All files in folder start with entity name (singular)
- ✅ Use specific suffixes: `.repo.ts`, `.logic.ts`, `.validator.ts`, etc.
- ✅ Keep entity folders independent (no cross-entity imports in logic)
- ❌ Never use plural folder names (it's `user/` not `users/`)
- ❌ Never use generic `.service.ts` suffix

**See Also**: [Module Organization](module-organization.md), [File Type Suffixes](../02-naming-conventions/file-type-suffixes.md)

---

### 3. Components/Libs Layer (`src/components/` or `src/libs/`)

**Purpose**: Reusable application components and utilities.

**Use `components/`** for:
- UI components (React, Vue, Angular, etc.)
- Visual elements and layouts
- Frontend-specific modules

**Use `libs/`** for:
- Integrations with third-party services and SDKs
- A small client or adapter around an external API, including when no SDK exists
- Shared application libraries and cross-cutting services that are not owned by one entity

**Examples with `components/`**:

```
src/components/
├── user-card/
│   ├── user-card.tsx           ← Component
│   ├── user-card.module.css    ← Styles
│   ├── user-card.types.ts      ← Props
│   ├── user-card.test.tsx      ← Tests
│   └── index.ts                ← Export
│
├── product-list/
│   ├── product-list.tsx
│   ├── product-list.module.css
│   ├── product-list.types.ts
│   └── index.ts
│
├── modal/
│   ├── modal.tsx
│   ├── modal.module.css
│   └── index.ts
│
└── form-field/
    ├── form-field.tsx
    ├── form-field.module.css
    └── index.ts
```

**Examples with `libs/`**:

```
src/libs/
├── youtube/                    ← YouTube integration (SDK or API wrapper)
│   ├── youtube.client.ts       ← Calls the external service
│   ├── youtube.types.ts        ← Integration-specific types, if needed
│   └── youtube.constants.ts    ← Integration-specific constants, if needed
│
├── auth-service/               ← Cross-entity auth logic
│   ├── auth.ts
│   ├── auth.service.ts
│   ├── auth.validator.ts
│   └── index.ts
│
├── file-upload/                ← File handling (used by multiple entities)
│   ├── file-upload.service.ts
│   ├── file-upload.validator.ts
│   └── index.ts
│
├── notifications/              ← Notification system (cross-cutting)
│   ├── notification.service.ts
│   ├── notification.types.ts
│   └── index.ts
│
└── state-management/           ← Global state (if using Vuex/Redux/etc.)
    ├── store.ts
    ├── user-module.ts
    ├── product-module.ts
    └── index.ts
```

**Key Rules**:
- ✅ For `components/`: UI elements and visual components
- ✅ For `libs/`: Third-party integrations, shared services, and reusable libraries not owned by one entity
- ✅ Wrap an external API in a small client or adapter when no suitable SDK exists
- ✅ Reusable across multiple features
- ✅ Can have entity-agnostic services here
- ❌ Don't put single-entity logic here (goes in entities/)
- ❌ Don't duplicate entity-specific code
- ❌ Don't copy an SDK or external API's behavior into entity domain logic; keep integration details behind the `libs/` boundary

**When to use `components/` vs `libs/`**:
- **Frontend-heavy projects** → Use `components/` for UI, `libs/` for non-UI reusables
- **Backend-heavy projects** → Use `libs/` for shared services, `components/` not needed
- **Full-stack** → Both folders, different purposes

---

### 4. Pages/Routes Layer (`src/pages/` or `src/routes/`)

**Purpose**: Application structure and navigation.

**Use `pages/`** for:
- Page components (in frameworks like Next.js, Nuxt, Gatsby)
- Full-page layouts
- Top-level views

**Use `routes/`** for:
- Route definitions and configuration
- Backend route handlers
- API endpoint definitions

**Examples with `pages/`**:

```
src/pages/
├── home.tsx                    ← Home page
├── not-found.tsx               ← 404 page
├── user/
│   ├── user-list.tsx           ← List all users
│   ├── user-detail.tsx         ← Single user page
│   └── user-settings.tsx       ← User settings page
├── product/
│   ├── product-list.tsx
│   ├── product-detail.tsx
│   └── product-search.tsx
└── cart/
    ├── cart.tsx
    └── checkout.tsx
```

### Keep deep page hierarchies shallow

Avoid nested folders when a page has sub-pages. Encode the route hierarchy in a single peer-folder name, using `--` between route segments:

```
pages/
├── profile/
├── profile--settings/
└── profile--settings--security/
```

Here, `profile--settings--security/` represents the route hierarchy `profile/settings/security`. Put that page's files directly in its folder. Do not create `pages/profile/pages/settings/` or another nested `pages/` folder.

Use the same spelling and order as the route segments, and check your framework's routing rules: some frameworks derive URLs from directory names and may need explicit route configuration for this convention.

**Examples with `routes/`**:

```
src/routes/
├── articles/
│   ├── articles.routes.ts
│   ├── articles.constants.ts  ← Add when needed
│   └── articles.utils.ts      ← Add when needed
├── users/
│   └── users.routes.ts
└── auth/
    └── auth.routes.ts
```

**Key Rules**:
- ✅ `pages/` folder is PLURAL (contains multiple pages)
- ✅ `routes/` folder is PLURAL (contains multiple routes)
- ✅ Give each route its own directory from the first file; name companion files with the same directory base name
- ✅ Route directory names may be plural when they match plural API resources, such as `articles/`
- ✅ Each page/route maps to a URL path
- ❌ Don't put business logic in pages (import from entities/)
- ✅ For deep page hierarchies, use peer folders with `--`-separated route segments instead of nested directories

**See Also**: [Module Organization](module-organization.md#exceptions-pages-and-routes)

---

## Scripts: One Folder per Task

Put each standalone, entity-focused script in its own shallow folder. Name the folder and primary file `{entity}--{action}`; keep related documentation, constants, and other files beside it with the same base name:

```
scripts/
└── user--update-description/
    ├── user--update-description.ts
    ├── user--update-description.md
    └── user--update-description.constants.ts
```

Add companion files only when needed. Keep them in the task folder rather than creating nested `constants/`, `docs/`, or `helpers/` directories. Use a specific action in the name, and avoid this convention for general-purpose tooling that is not tied to one entity and action.

---

## Complete Example Structure

```
src/
│
├── core/                           ← Application foundation
│   ├── app.ts
│   ├── app.config.ts
│   ├── environment.config.ts
│   ├── logger/
│   │   ├── logger.config.ts
│   │   └── logger.types.ts
│   ├── database/
│   │   ├── database.config.ts
│   │   └── database.connection.ts
│   ├── utils/
│   │   ├── date-formatter.ts
│   │   ├── string-validator.ts
│   │   └── error-handler.ts
│   ├── types/
│   │   ├── pagination.types.ts
│   │   └── common.types.ts
│   └── index.ts
│
├── entities/                       ← Domain logic
│   ├── user/
│   │   ├── user.ts
│   │   ├── user.repo.ts
│   │   ├── user.logic.ts
│   │   ├── user.validator.ts
│   │   ├── user.mapper.ts
│   │   ├── user.constants.ts
│   │   └── index.ts
│   │
│   ├── product/
│   │   ├── product.ts
│   │   ├── product.repo.ts
│   │   ├── product.logic.ts
│   │   ├── product.validator.ts
│   │   └── index.ts
│   │
│   ├── order/
│   │   ├── order.ts
│   │   ├── order.repo.ts
│   │   ├── order.logic.ts
│   │   ├── order.manager.ts
│   │   ├── order.validator.ts
│   │   └── index.ts
│   │
│   └── comment/
│       ├── comment.ts
│       ├── comment.repo.ts
│       ├── comment.logic.ts
│       └── index.ts
│
├── components/                     ← Reusable UI components
│   ├── user-card/
│   │   ├── user-card.tsx
│   │   ├── user-card.module.css
│   │   ├── user-card.types.ts
│   │   └── index.ts
│   │
│   ├── product-list/
│   │   ├── product-list.tsx
│   │   ├── product-list.module.css
│   │   └── index.ts
│   │
│   ├── modal/
│   │   ├── modal.tsx
│   │   ├── modal.module.css
│   │   └── index.ts
│   │
│   └── form-field/
│       ├── form-field.tsx
│       ├── form-field.module.css
│       └── index.ts
│
├── libs/                           ← Shared services
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.validator.ts
│   │   └── index.ts
│   │
│   ├── notifications/
│   │   ├── notification.service.ts
│   │   ├── notification.types.ts
│   │   └── index.ts
│   │
│   └── file-upload/
│       ├── file-upload.service.ts
│       └── index.ts
│
└── pages/                          ← Application pages
    ├── home.tsx
    ├── not-found.tsx
    ├── user/
    │   ├── user-list.tsx
    │   ├── user-detail.tsx
    │   └── user-settings.tsx
    ├── product/
    │   ├── product-list.tsx
    │   ├── product-detail.tsx
    │   └── product-search.tsx
    └── cart/
        ├── cart.tsx
        └── checkout.tsx
```

---

## Keep Directory Nesting Shallow

As a default, keep paths to **3 folder levels or fewer** so code is easy to explore. When a logical hierarchy is deeper, flatten it into peer folders with names that preserve the hierarchy, as shown above for pages. The goal is shallow navigation, not a strict limit on how many route segments a feature may have.

```
✅ GOOD — 3 levels max
src/
  entities/          ← Level 1
    user/            ← Level 2
      user.repo.ts   ← Level 3 (file)

✅ GOOD — 2 levels max
src/
  components/        ← Level 1
    user-card/       ← Level 2
      user-card.tsx  ← Level 3 (file)

❌ BAD — Unnecessary nested directories
src/
  domain/            ← Level 1
    entities/        ← Level 2
      user/          ← Level 3
        repository/  ← Adds a level without helping navigation
          user.repo.ts
```

**Why this matters**:
- Easier navigation and file discovery
- Clearer mental model of codebase
- Faster development velocity
- Reduced context switching

---

## Folder Naming Rules

### Always Singular (except pages/ and routes/)

```
✅ CORRECT — Singular
src/user/
src/product/
src/comment/
src/entities/

✅ EXCEPTIONS — Plural only for these
src/pages/          (contains multiple pages)
src/routes/         (contains multiple routes)

❌ WRONG — Plural (for everything else)
src/users/          (should be user/)
src/products/       (should be product/)
src/entities/user/  (should be entities/)
```

**Why**: Singular is clearer conceptually. A folder named `user/` represents the User concept, not a collection of users.

---

## Import Patterns

### Within Same Entity

```typescript
// user/user.logic.ts
import { User } from './user';
import { UserRepository } from './user.repo';
import { validateEmail } from './user.validator';
```

### From Other Entity

```typescript
// order/order.logic.ts
// Importing User from user entity
import { User } from '../user';        // Via barrel
// or
import { User } from '../user/user';   // Direct import
```

### From Core

```typescript
// entities/user/user.logic.ts
// Using shared utilities
import { formatDate } from '../../core/utils/date-formatter';
import { Pagination } from '../../core/types/pagination.types';
```

### From Libs/Components

```typescript
// entities/order/order.logic.ts
// Using shared service
import { AuthService } from '../../libs/auth';

// pages/user-list.tsx
// Using component
import { UserCard } from '../../components/user-card';
```

---

## Variations by Project Type

### Backend Project (Node.js/Express/Nest.js)

```
src/
├── core/              ← App setup, config
├── entities/          ← Domain models and logic
├── libs/              ← Shared services
├── routes/            ← API route definitions
└── middleware/        ← Global middleware (or in core/)
```

**Note**: Skip `pages/` and `components/` folders entirely.

---

### Frontend Project (React/Vue/Angular)

```
src/
├── core/              ← Config, shared utils
├── entities/          ← Domain models (optional)
├── components/        ← UI components
└── pages/             ← Application pages
```

**Note**: `libs/` only if you have shared services.

---

### Full-Stack Project

```
src/
├── core/              ← Shared config, utils
├── entities/          ← Shared domain models
├── components/        ← UI components (frontend)
├── libs/              ← Shared services (both)
├── pages/             ← Application pages (frontend)
└── routes/            ← API routes (backend)
```

Or split into separate backend/frontend folders:

```
backend/
├── core/
├── entities/
├── libs/
└── routes/

frontend/
├── core/
├── components/
├── pages/
└── libs/
```

---

## Migrating to This Structure

### From Scattered Folders

**Before** (bad structure):

```
src/
├── interfaces/
│   └── user.ts
├── services/
│   └── user.service.ts
├── controllers/
│   └── user.controller.ts
├── dto/
│   └── user.dto.ts
├── validators/
│   └── user.validator.ts
└── utils/
    └── user-helpers.ts
```

**After** (organized):

```
src/
├── core/
│   └── utils/
│       └── date-formatter.ts
├── entities/
│   └── user/
│       ├── user.ts
│       ├── user.repo.ts
│       ├── user.logic.ts
│       ├── user.mapper.ts
│       └── user.validator.ts
└── pages/
    └── user/
        ├── user-list.tsx
        └── user-detail.tsx
```

**Steps**:
1. Create `entities/user/` folder
2. Move all user-related files into it
3. Rename files to use consistent pattern: `user.{type}.ts`
4. Update import paths
5. Repeat for other entities

---

## Quick Checklist

When organizing your project:

- [ ] Is your project split into 4 levels: `core/`, `entities/`, `components/`, `pages/`?
- [ ] Is each entity in its own folder under `entities/`?
- [ ] Does each entity folder use singular naming?
- [ ] Do all files in an entity folder start with entity name?
- [ ] Is folder depth never more than 3 levels?
- [ ] Are entity folders singular and route directories named after their API resources?
- [ ] Does each route have its own directory with matching file prefixes?
- [ ] Are shared utilities in `core/`, not scattered?
- [ ] Are reusable components in `components/`?
- [ ] Are cross-entity services in `libs/`?

---

## Related

- [Module Organization](module-organization.md)
- [File Type Suffixes](../02-naming-conventions/file-type-suffixes.md)
- [Files & Folders Naming](../02-naming-conventions/files-folders.md)
- [No Nesting Rule](no-nesting-rule.md)
