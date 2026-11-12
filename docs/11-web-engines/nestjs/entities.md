# NestJS: Entities

## Shapes

```ts
// user.types.ts  (plain interface, no decorators)
export interface User {
  id: number;
  name: string;
  teamId: number;
}
```

```ts
// user.dto.ts  (classes for validation and Swagger)
export class UserParamsDto {
  @IsInt()
  @Type(() => Number)
  id!: number;
}

export class UserResponseDto {
  id!: number;
  name!: string;
  team!: { id: number; name: string };
}
```

```ts
// user.mapper.ts
export const toUserResponse = (user: User, team: Team): UserResponseDto => ({
  id: user.id,
  name: user.name,
  team: { id: team.id, name: team.name },
});
```

## Rules

| Type | Holds | Decorators |
|------|-------|-----------|
| `User` | Entity | None |
| `*Dto` | Transport shape | `class-validator`, `class-transformer` |
| Mapper | Conversion | None |

Keep ORM entities (if any) in `user.repo.ts` or a `user.row.ts`, never in the DTO file.
