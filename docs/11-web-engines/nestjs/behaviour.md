# NestJS: Behaviour

## Controller

```ts
// user.controller.ts
@Controller('users')
export class UserController {
  constructor(private readonly users: UserLogic) {}

  @Get(':id')
  async get(@Param() params: UserParamsDto): Promise<UserResponseDto> {
    const user = await this.users.get(params.id);
    return toUserResponse(user, await this.users.teamOf(user));
  }
}
```

## Logic and Repo

```ts
// user.logic.ts
@Injectable()
export class UserLogic {
  constructor(private readonly repo: UserRepo) {}

  async get(id: number): Promise<User> {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }
}
```

Classes are required here by Nest's DI. The methods themselves stay short and do one job.

## Module

```ts
// user.module.ts
@Module({
  controllers: [UserController],
  providers: [UserLogic, UserRepo],
})
export class UserModule {}
```

## Rules

| Rule | Reason |
|------|--------|
| `ValidationPipe` global with `whitelist: true` | Strips unknown input |
| Logic throws Nest exceptions or `AppError` | Filter maps once |
| Dependencies only through constructor | Testable |
| Controller never calls the repo | Layers |

## Tests

| Target | Tool | Checks |
|--------|------|--------|
| Logic | Jest/Vitest, fake repo | Rules |
| Controller | `Test.createTestingModule` | Status and body |

Name = scenario + outcome.
