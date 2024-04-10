# Entity Driven Architecture

Entity Driven Architecture - it's a way to make your project simple and extendable.

## Core Rules

- As simple as possible (KISS).
- Correct Naming.
- No nested lists.
- Component-based style.

## File structure

```text
core // First-level interfaces, classes, services (SOLID)
entities // Interfaces for models, services - for communication between API and components
components // Components that can be reused (DRY).
pages // Components for pages (contains components).
```

### Example

```text
core/
  local-storage/
    local-storage.service.ts
    local-storage.service.spec.ts
entities/
  user/
    user.service.ts
    user.service.spec.ts
    user.mockup.ts
    user.constant.ts
components/
  header/
    header.component.ts
    header.component.spec.ts
    header.css
    header.service.ts
    header.service.spec.jts
    header.mockup.ts
    header.constant.ts
pages/
  home/
    home.component.ts
    home.component.spec.ts
    home.css
    home.service.ts
    home.service.spec.ts
    home.mockup.ts
    home.constant.ts
  users/
    users.component.ts
    users.component.spec.ts
    users.css
    users.service.ts
    users.service.spec.ts
    users.mockup.ts
    users.constant.ts
```
