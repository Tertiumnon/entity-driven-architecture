# Entity Driven Architecture

Entity Driven Architecture - it's a way to make your project simple and extendable.

## Core Rules

First of all it's very important to use KISS, SOLID and Clean Architecture principles.

And then you need to understand what is Entity.

### Entity

Entity is a base unit that exists as a model. 

Сущность (entity) - это объект (структура данных), имеющий характеризующие его свойства.

Понимание сущности даёт нам понимание процессов и того, как написать наиболее простой и понятный код.

Например, мы можем сказать, что есть сущность `User`, имеющая свойства `email` и `name`.

```ts
User
  email
  name
```

User, Post, Comment и другие - это всё базовые сущности, "кирпичики", из которых состоит система.

По сути, сущность - это базовое понятие ООП - абстракция данных, которая нужна для того, чтобы мы могли лучше понять, как работать с имеющимся набором данных.

Сущность - это также Модель данных, которая может/должна соответствовать таблице в базе данных.

Например, в случае с User - это должна быть таблица в БД на стороне сервера. Однако, есть и другие кейсы. Например, сущность LocalStorage для браузера - это тоже сущность, но она не будет иметь своей таблицы в БД на сервере.

```ts
class LocalStorageService {
  setItem() {}
  getItem() {}
}
```

## Other rules

- No nested components
- Correct Naming
- Component-based style

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
core          -> First-level (abstract) classes and interfaces (SOLID)
components    -> Components that can be reused (DRY)
entities      -> Classes and interfaces for entities
pages         -> Components for views
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

## "Find"-methods

If we can't find something and return type is a primitive, we should return the same type primitive.

For example, basic JS methods:

```ts
"car".search("a"); // 1
"car".search("c"); // 0
"car".search("d"); // -1
```

Or may be:

```ts
function getUserLastName(user: User): string {}
```

If we can't find something and return type is an object, we should return `null`.

```ts
function findUser(filters: Filter[]): User | null {}
```

If you work with JS, you can use `undefined` value. But when you're getting data from API, you can't get `undefined`. So, you will get `null` value. That's the reason, why I think that `null` value is more preferable.

```ts
function findUser(filters: Filter[]): User | null {}
```

And the last case is an array. If you can't find, you will get an empty array.

```ts
function findUsers(filters: Filter[]): User[] {}
```

### If you want to return an array of entities

```ts
function getUsers(filters: Filter[]): User[] {}
```

### Throwing errors in methods

How do you think, are these methods correct?

```ts
// if we know that the first ID is 0
function getUserIdByName(name: string): number {
  return userList.find(user => user.name === name)?.id || -1;
}

function getUserNameById(id: number): string {
  return userList.find(user => user.id === id)?.name || "";
}
```

Let's create more correct methods!

```ts
function findUserIdByName(name: string): number {
  const user = userList.find(user => user.name === name);
  if (!user) throw new Error(`User with name ${name} was not found.`);
  return user.id;
}

function findUserNameById(id: number): string {
  const user = userList.find(user => user.id === id);
  if (!user) throw new Error(`User with id ${id} was not found.`);
  return user.name;
}
```

Is that right? I don't think so.

## Method as a part of class

Если метод является частью класса, то в целях сокращения лучше сократить названия методов, исходя из того, что нам уже известна сущность и нам не нужно повторяться.

```ts
class UserService {
  find(): User[] {}
}
```

## API classes and methods

### Typical CRUD service

```ts
// GOOD
class UserService {
  find(filters: Filter[]): User[] {} // find all users (using parameters/filters or without them)
  create(dto: UserCreateDto): User {} // create user
  get(id: string): User {} // get user by ID or GUID
  update(id: string, dto: UserUpdateDto): User {} // update user
  delete(id: string): boolean {} // delete user
}

// NOT SO GOOD
class UserService {
  findAll(filters: Filter[]): User[] {} // find all users (using parameters/filters or without them)
  findUnique(filters: Filter[]): User {} // find unique user (using parameters/filters)
  create(dto: UserCreateDto): User {} // create user
  get(id: string): User {} // get user by ID or GUID
  update(id: string, dto: UserUpdateDto): User {} // update user
  delete(id: string): boolean {} // delete user
}

// BAD, because it's complicated
class UserService {
  findAll(filters: Filter[]): User[] {} // find all users (using parameters/filters or without them)
  findUnique(filters: Filter[]): User {} // find unique user (using parameters/filters)
  search(query: string): User[] {} // find unique user (using parameters/filters)
  create(dto: UserCreateDto): User {} // create user
  get(id: string): User {} // get user by ID or GUID
  update(id: string, dto: UserUpdateDto): User {} // update user
  delete(id: string): boolean {} // delete user
}
```

In case when we use a special word "find", we understand that we want to find something, but we don't know the result. If we don't get it, we should expect an empty array `[]` for "findAll" and `null` - for "find" methods.

In case when we use a special word "get", we understand that we want to get existing object with unique identifier. If we don't get it, we should expect an error.

Methods `create`, `get`, `update` and `delete` are typical methods for CRUD operations. Every time when we use these methods, we always use ID of existing object (except `create`), so we don't need to duplicate "ByID" in these methods.

Если класс является утилитарным, то лучше конкретизировать методы, так как они могут быть самые разнообразные.

```ts
class UserUtility {
  findAllFriends() {}
}
```

### Nested methods

Don't create nested methods with one nested method inside - it's overcomplicated for understanding.

```ts
function getUsers() {
  return UserService.getAll();
}
```

Unfortunately, sometimes we need to use nested methods in cases when nested method is private.

```ts
class SomeComponent {
  construction(private userService: UserService) {}

  public getUsers() {
    return this.userService.getAll();
  }
}
```

## Naming for variables, methods and classes

Название переменной должно быть таким, чтобы было понятно, что она содержит.

Лучше всего создать систему именования переменных, которой будет пользоваться вся команда. Эта система должна подразумевать чёткие и простые правила.

### File naming

Названия файлов должны соответствовать названию класса и быть в единственном числе, если это сущность.

```ts
// user.ts
class User {}
```

Любой файл должен иметь свою директорию с тем же самым названием.

```ts
// user/user.ts
class User {}
```

Все файлы в директории должны иметь то же название (относиться к одной сущности), но различаться по назначению (вторая часть названия файла, отделённая точкой).

```text
user/
  user.type.ts
  user.service.ts
  user.component.ts
```

### Primitive variable naming

```ts
// BAD
var ageNumber = 30;

// BAD
var ageNum = 30;

// BAD
var ageN = 30;

// BAD
var a = 30;

// GOOD
var age = 30;
```

## Object variable naming

Object variable must be singular, if we're talking about object with properties.

Don't use special words to describe object type, because your IDE already knows the type.

```js
// BAD
const filters = {
  priceFrom: 0,
  priceTo: 99,
};

// BAD
const filterObj = {
  priceFrom: 0,
  priceTo: 99,
};

// GOOD
const filter = {
  priceFrom: 0,
  priceTo: 99,
};

// BAD
const filterArray = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];

// BAD
const filterArr = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];
```

You should decide, how to create names for arrays. For example, Bob Martin ("Clean Code") doesn't recommend to use keyword "List" because it can be interpreted as type (for example, type "List" in C#). But I think that you must not use type-keywords in names at all, so you can use "List" in names when you want to show that it's a list of some items (array).

```ts
// GOOD
const filters = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];

// GOOD
const filterList = [
  { name: "priceFrom", value: "0" },
  { name: "priceTo", value: "0" },
];
```

An advantage of using "List"-word is that you can use singular form of entity. For example:

```ts
var userList = [];

function findUserByName(name: string) {
  return userList.find(user => user.name === name);
}
```

##3 Methods naming

#### Use "get" word, if you want to return something EXISTING

```ts
function getAppUser(): User {}
```

#### Use "set" word, if you want to set value for something

```ts
function setAppUser(user: User): void {}
```

#### Use "find" word, if you want to find something, using filters, but you're not sure about the result

```ts
function findUser(filters: Filter[]): User | null {}
```

### Classes naming

#### Use can use reductions for common keywords in classes names

```text
UserController -> UserCtrl
UserService -> UserSvc
```
