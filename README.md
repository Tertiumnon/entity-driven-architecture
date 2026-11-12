# Entity-Driven Architecture

Guide to entity-driven development principles, naming conventions, and architectural patterns.

**Purpose**: Internal standard for development teams seeking structured, maintainable code through entity-driven design.

**Status**: Active - regularly updated based on team practices

---

## What is Entity-Driven Development?

Entity-driven development centers on understanding the core data models (entities) that drive your application. Rather than thinking in terms of implementation details, you think first about:

- What are my entities? (User, Product, Order)
- What properties define them? (id, name, email)
- What relationships exist between them?
- What operations do they support?

This thinking naturally leads to clean, scalable, maintainable architecture.

---

## Quick Start

**New to these concepts?** Start here:

1. [What is an Entity?](docs/core/01-introduction/what-is-entity.md) — 5 min read
2. [5-Minute Quick Reference](docs/core/01-introduction/quick-start.md) — Essential rules at a glance
3. [See working code examples](https://github.com/Tertiumnon/entity-driven-architecture--example) — Practical implementations

**Need a specific answer?** Use the table of contents below.

---

## Documentation Structure

### [1. Introduction](docs/core/01-introduction/)

Foundational concepts and philosophy.

- **[What is an Entity?](docs/core/01-introduction/what-is-entity.md)** — Definition and why entities matter
- **[Philosophy](docs/core/01-introduction/philosophy.md)** — Entity thinking in programming and real life
- **[Quick Start](docs/core/01-introduction/quick-start.md)** — Essential rules and checklist

### [2. Naming Conventions](docs/core/02-naming-conventions/)

Detailed naming guides for variables, functions, classes, and files.

- **[Overview](docs/core/02-naming-conventions/overview.md)** — General principles
- **[Variables](docs/core/02-naming-conventions/variables.md)** — Primitives, objects, arrays
- **[Functions & Methods](docs/core/02-naming-conventions/functions-methods.md)** — Verbs (get, find, fetch, create, etc.)
- **[Classes & Interfaces](docs/core/02-naming-conventions/classes-interfaces.md)** — PascalCase, suffixes (Service, Controller, Repository)
- **[Files & Folders](docs/core/02-naming-conventions/files-folders.md)** — kebab-case, consistency, alignment
- **[File Type Suffixes](docs/core/02-naming-conventions/file-type-suffixes.md)** — Be specific: .repo.ts, .validator.ts, .mapper.ts, not just .service.ts
- **[Barrel Exports](docs/core/02-naming-conventions/barrel-exports.md)** — Why central index files are an antipattern
- **[Anti-Patterns](docs/core/02-naming-conventions/anti-patterns.md)** — Common mistakes and how to fix them

### [3. Entity Structure](docs/core/03-entity-structure/)

Principles for designing entities, DTOs, and relationships.

- **[Flat Entities](docs/core/03-entity-structure/flat-entities.md)** — Core principle: keep domain models flat
- **[DTO vs Domain Model](docs/core/03-entity-structure/dto-vs-domain.md)** — When nesting is acceptable
- **[Common Interfaces](docs/core/03-entity-structure/common-interfaces.md)** — Shared interfaces (Timestamps, Identifiable, etc.)
- **[Relationships & References](docs/core/03-entity-structure/relationships.md)** — Foreign keys vs embedded objects
- **[Denormalization](docs/core/03-entity-structure/denormalization.md)** — When and why to denormalize
- **[Examples](docs/examples/entity-structure.md)** — Real entity examples (User, Product, Order)

### [4. Backend Patterns](docs/core/04-backend-patterns/)

REST API design, service layers, and backend conventions.

- **[REST API Design](docs/core/04-backend-patterns/rest-api-design.md)** — CRUD endpoints, HTTP verbs, URI conventions
- **[Request & Response](docs/core/04-backend-patterns/request-response.md)** — DTO patterns, status codes, error responses
- **[Error Handling](docs/core/04-backend-patterns/error-handling.md)** — Standardized error formats
- **[Service Layer](docs/core/04-backend-patterns/service-layer.md)** — Service patterns (find, get, create, update, delete)
- **[Examples](docs/examples/backend-patterns.md)** — Complete API endpoint examples

### [5. Frontend Patterns](docs/core/05-frontend-patterns/)

HTML, CSS, JavaScript, and component conventions.

- **[HTML Structure](docs/core/05-frontend-patterns/html-structure.md)** — Semantic HTML, accessibility
- **[CSS Naming](docs/core/05-frontend-patterns/css-naming.md)** — BEM-like conventions, modifiers, scoping
- **[Component Structure](docs/core/05-frontend-patterns/component-structure.md)** — Component organization, collocation
- **[State Management](docs/core/05-frontend-patterns/state-management.md)** — Entity-driven state patterns
- **[Examples](docs/examples/frontend-patterns.md)** — Component implementation examples

### [6. Architecture](docs/core/06-architecture/)

Project structure, folder organization, and no-nesting rules.

- **[Folder Structure](docs/core/06-architecture/folder-structure.md)** — 4-level structure: core, entities, components/libs, pages/routes
- **[Module Organization](docs/core/06-architecture/module-organization.md)** — Entity folders with consistent file naming patterns
- **[No Nesting Rule](docs/core/06-architecture/no-nesting-rule.md)** — Maximum 3 levels explanation and enforcement
- **[Component Collocation](docs/core/06-architecture/component-collocation.md)** — Keeping related files together
- **[Separation of Concerns](docs/core/06-architecture/separation-of-concerns.md)** — How core, entities, components, pages differ
- **[Migration Guide](docs/core/06-architecture/migration-guide.md)** — Refactoring existing projects

### [7. Advanced Topics](docs/core/07-advanced-topics/)

Nuanced decisions, testing strategies, and edge cases.

- **[Error Handling Strategies](docs/core/07-advanced-topics/error-handling-strategies.md)** — Throwing errors vs returning null
- **[Method Naming Context](docs/core/07-advanced-topics/method-naming-context.md)** — Class methods vs standalone functions
- **[When Nesting is OK](docs/core/07-advanced-topics/nested-methods.md)** — DTOs, views, projections (2 levels max)
- **[DTO Patterns](docs/core/07-advanced-topics/dto-patterns.md)** — CreateDto, UpdateDto, ResponseDto
- **[Testing Strategies](docs/core/07-advanced-topics/testing-strategies.md)** — Testing entity-driven code

### [8. Real-World Examples](docs/examples/real-world-examples/)

Practical domain examples showing entity-driven design in action.

#### E-Commerce

- **[Entities](docs/examples/real-world-examples/e-commerce/entities.md)** — User, Product, Order, Cart, Category
- **[API Design](docs/examples/real-world-examples/e-commerce/api-design.md)** — Complete REST endpoints
- **[Frontend Structure](docs/examples/real-world-examples/e-commerce/frontend-structure.md)** — Pages and components

#### Blog Platform

- **[Entities](docs/examples/real-world-examples/blog-platform/entities.md)** — User, Post, Comment, Tag
- **[API Design](docs/examples/real-world-examples/blog-platform/api-design.md)**
- **[Frontend Structure](docs/examples/real-world-examples/blog-platform/frontend-structure.md)**

#### Task Management

- **[Entities](docs/examples/real-world-examples/task-management/entities.md)** — User, Project, Task, Label, Workspace
- **[API Design](docs/examples/real-world-examples/task-management/api-design.md)**
- **[Frontend Structure](docs/examples/real-world-examples/task-management/frontend-structure.md)**

See **working implementations** in [entity-driven-architecture--example](https://github.com/Tertiumnon/entity-driven-architecture--example).

### [9. Reference](docs/core/09-reference/)

Quick lookups, checklists, and glossary.

- **[Naming Checklist](docs/core/09-reference/checklists.md)** — Validate your naming
- **[Architecture Checklist](docs/core/09-reference/checklists.md)** — Validate your structure
- **[Glossary](docs/core/09-reference/glossary.md)** — Term definitions
- **[FAQ](docs/core/09-reference/faq.md)** — Common questions
- **[External Resources](docs/core/09-reference/resources.md)** — Links to referenced tools and standards

### [10. Game Engines](docs/core/10-game-engines/)

Entity patterns for Unity (C#) and Godot: folders, naming, config data, systems and views.

- **[Overview](docs/core/10-game-engines/overview.md)** — Shared principles and choosing an approach
- **[Unity](docs/core/10-game-engines/unity/overview.md)** — Entities, config assets, systems, views, tests
- **[Folders and Naming (Unity)](docs/core/10-game-engines/unity/structure.md)** — Entity folders, PascalCase file names, suffixes
- **[Unity ECS](docs/core/10-game-engines/unity-ecs/overview.md)** — The Entities runtime, chosen at kickoff for thousands of simulated entities
- **[Godot](docs/core/10-game-engines/godot/overview.md)** — Scenes, resources, components, signals

### [11. Web Engines](docs/core/11-web-engines/)

Entity patterns for frameworks: frontend (React, SolidJS, Angular) and backend (Express, Elysia, Hono, NestJS).

- **[Overview](docs/core/11-web-engines/overview.md)** — Shared layers and suffix mapping
- **[React](docs/core/11-web-engines/react/overview.md)** · **[SolidJS](docs/core/11-web-engines/solidjs/overview.md)** · **[Angular](docs/core/11-web-engines/angular/overview.md)**
- **[Express](docs/core/11-web-engines/express/overview.md)** · **[Elysia](docs/core/11-web-engines/elysia/overview.md)** · **[Hono](docs/core/11-web-engines/hono/overview.md)** · **[NestJS](docs/core/11-web-engines/nestjs/overview.md)**

---

## Key Principles at a Glance

### Naming

- Names reflect **what** things are, not **how** they're implemented
- No type suffixes: ~~`ageNumber`~~ → `age`
- No entity prefixes in properties: ~~`user.userId`~~ → `user.id`
- Consistent verbs for actions: `get`, `find`, `fetch`, `create`, `update`, `delete`
- File names match content: `user.service.ts`, not `utils.ts`

### Entity Structure

- **Domain models**: Keep them flat (no nesting)
- **DTOs**: Can have 1–2 levels of nesting for API convenience
- **References**: Use IDs, not full objects: `userId`, not `user: { id, name, email }`
- **Denormalization**: Acceptable for performance, but must be intentional and documented

### Architecture

- **4-level structure**: `core/` → `entities/` → `components/` → `pages/`
- **Max 3 folder levels**: Prevents deep nesting and cognitive overload
- **Collocation**: Tests, mocks, constants live with their code
- **Clear boundaries**: Each level has specific responsibilities

### Backend

- **CRUD verbs**: GET, POST, PUT/PATCH, DELETE
- **Service layer**: `find()`, `get()`, `create()`, `update()`, `delete()`
- **Return types**:
  - `find()` returns empty array if nothing found
  - `get()` throws error if not found
  - `create()` returns new entity

---

## Working Examples

All theoretical concepts have **working code implementations** in:

**[entity-driven-architecture--example](https://github.com/Tertiumnon/entity-driven-architecture--example)**

- Basic example with User entity
- E-commerce with User, Product, Order, Cart
- Blog platform with Posts, Comments, Tags
- Task management system
- Full TypeScript, tests, component examples

---

## Scope

This guide covers:

- Naming conventions for all code artifacts
- Entity and data structure design
- Separation of concerns and architecture
- Frontend component and CSS conventions
- Backend service and API patterns
- Game engine patterns for Unity and Godot (section 10)
- Real-world examples and case studies

This guide **does not** cover:

- Framework-specific patterns (React, Angular, Vue patterns go in their own guides)
- DevOps or deployment
- Performance optimization (beyond general principles)
- Database schemas (only conceptual data models)

---

## How to Use This Guide

### By Role

- **Backend Developer**: Read [Backend Patterns](docs/core/04-backend-patterns/) → [Entity Structure](docs/core/03-entity-structure/)
- **Frontend Developer**: Read [Frontend Patterns](docs/core/05-frontend-patterns/) → [Architecture](docs/core/06-architecture/)
- **Game Developer**: Read [Game Engines](docs/core/10-game-engines/) → [Entity Structure](docs/core/03-entity-structure/)
- **Full Stack**: Start with [Introduction](docs/core/01-introduction/) → read all
- **Team Lead**: Use checklists in [Reference](docs/core/09-reference/), share examples with team

### By Question Type

- "How should I name this function?" → [Functions & Methods](docs/core/02-naming-conventions/functions-methods.md)
- "How do I structure my entities?" → [Flat Entities](docs/core/03-entity-structure/flat-entities.md)
- "How should my API endpoints look?" → [REST API Design](docs/core/04-backend-patterns/rest-api-design.md)
- "Is my file organization correct?" → [Folder Structure](docs/core/06-architecture/folder-structure.md)
- "How do I handle errors?" → [Error Handling](docs/core/07-advanced-topics/error-handling-strategies.md)

### By Depth

- **Quick answer** (2 min): [Quick Start](docs/core/01-introduction/quick-start.md)
- **Detailed answer** (15 min): Topic's main guide (e.g., [Naming Conventions](docs/core/02-naming-conventions/overview.md))
- **Deep dive** (30+ min): Topic + Examples + Anti-Patterns
- **Hands-on learning**: [Working code examples](https://github.com/Tertiumnon/entity-driven-architecture--example)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-11-12 | Added game engine patterns for Unity and Godot (section 10) |
| 2.0 | 2026-06-29 | Complete restructure: reorganized into 9 sections, expanded examples, added real-world case studies, fixed JSON typos |
| 1.0 | 2024-12-20 | Initial documentation |

---

## Internal Use

**Tertium Development Team** — Internal standard
**Last Updated**: 2026-06-29
**Maintained By**: Development Team

For questions or feedback, contact your team lead or create an issue in this repository.

## Support

If this project is useful to you, you can support its development on [Ko-fi](https://ko-fi.com/tertiumnon).
