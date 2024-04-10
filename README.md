# Entity Driven Architecture

Entity Driven Architecture - it's a way to make your project simple and extendable.

## Core Rules

- As simple as possible (KISS).
- Correct Naming.
- No nested lists.

## File structure

```text
core // First-level interfaces, classes, services (SOLID)
entities // Interfaces for models, services - for communication between API and components
components // Components that can be reused (DRY).
pages // Components for pages (contains components).
```

```text
common/
  header/
    header.component.js
    header.component.spec.js
    header.css
    header.service.js
    header.service.spec.js
    header.mockup.js
    header.constants.js
  user/
    user.service.js
    user.service.spec.js
    user.mockup.js
    user.constants.js
pages/
  home/
    home.component.js
    home.component.spec.js
    home.css
    home.service.js
    home.service.spec.js
    home.mockup.js
    home.constants.js
  users/
    users.component.js
    users.component.spec.js
    users.css
    users.service.js
    users.service.spec.js
    users.mockup.js
    users.constants.js
```
