# Entity Driven Architecture

Entity Driven Architecture - it's a way to make your project simple and extendable.

## Core Rules

- As simple as possible (KISS).
- Correct Naming.
- No nested components.
- Component-based style.

### No nested folders/components/etc

You should use 3 levels.

```text
# BAD
entities/              -> 1st level
  user.interface.ts    -> 2nd level
```

```text
# GOOD
entities/              -> 1st level
  user/                -> 2nd level
    user.interface.ts  -> 3rd level
```

The same for URL's, but as less as possible.

```text
# GOOD
/users                       -> 1st level
/users/{{id}}                -> 2nd level
/profile/settings            -> 2nd level
/profile/email/confirmation  -> 3rd level
```

### Component-based style

You should place all entity-files into one directory, including tests. So you can divide your application into parts that can be moved or deleted without problems.

```text
entities/
  user/
    user.interface.ts
    user.service.ts
    user.service.spec.ts
    user.mockup.ts
    user.constant.ts
```

## File structure

```text
core          -> First-level interfaces, classes, services (SOLID)
components    -> Components that can be reused (DRY).
entities      -> Interfaces for models, services - for communication between API and components
pages         -> Components for pages (contains components).
```

### Example

```text
core/
  local-storage/
    local-storage.service.ts
    local-storage.service.spec.ts
components/
  navbar/
    navbar.component.ts
    navbar.component.spec.ts
    navbar.css
    navbar.service.ts
    navbar.service.spec.jts
    navbar.mockup.ts
    navbar.constant.ts
  header/
    header.component.ts
    header.component.spec.ts
    header.css
    header.service.ts
    header.service.spec.jts
    header.mockup.ts
    header.constant.ts
entities/
  user/
    user.interface.ts
    user.service.ts
    user.service.spec.ts
    user.mockup.ts
    user.constant.ts
pages/
  home/                       -> "/"
    home.component.ts
    home.component.spec.ts
    home.css
    home.service.ts
    home.service.spec.ts
    home.mockup.ts
    home.constant.ts
  users/                       -> "/users"
    users.component.ts
    users.component.spec.ts
    users.css
    users.service.ts
    users.service.spec.ts
    users.mockup.ts
    users.constant.ts
  user/                        -> "/users/{{id}}"
    user.component.ts
    user.component.spec.ts
    user.css
    user.service.ts
    user.service.spec.ts
    user.mockup.ts
    user.constant.ts
```
