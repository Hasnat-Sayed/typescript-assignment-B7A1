# How Generics Allow You to Build Reusable, Strictly Typed Functions and Components in TypeScript

## Introduction

Generics are one of the most powerful features in TypeScript. Without generics you have a tough choice: either write a function that works for a specific type or use `any` to lose all type safety. But with generics you have a better option: you can write a function once that works for any type, and it remains fully typed. They are the building blocks for truly reusable TypeScript code.

## The Problem Without Generics

Suppose you want a function that returns the first element of an array. Without generics you might write separate functions for each type, such as:

```typescript
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstString(arr: string[]): string {
  return arr[0];
}
```

This violates the DRY(Don't Repeat Yourself) principle immediately. The code is identical, only the type changes.

You could use `any` to unify them:

```typescript
function getFirst(arr: any[]): any {
  return arr[0];
}
```

But now TypeScript has no idea what `getFirst` returns. The caller loses all type information.

```typescript
const first = getFirst([1, 2, 3]);
first.toUpperCase(); // No error from TypeScript — but crashes at runtime
```

---

## Generics: One Function, Every Type

Generics solve this by introducing a type parameter; a placeholder that gets filled in at the time the function is called.

```typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}
```

Here, "T" is not a real type; its a variable that holds a type. When you call the function TypeScript infers "T" automatically.

```typescript
const firstNumber = getFirst([1, 2, 3]); // T inferred as number
const firstString = getFirst(["a", "b"]); // T inferred as string

firstNumber.toFixed(2); // ✅ works — TypeScript knows it's a number
firstString.toUpperCase(); // ✅ works — TypeScript knows it's a string
```

One function, strictly typed for every case.

## Generic Interfaces

Generics works on interfaces too, making data structures reusable across types.

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "Success",
};

const productResponse: ApiResponse<Product> = {
  data: { id: 5, title: "Keyboard", price: 49.99 },
  status: 200,
  message: "Success",
};
```

`ApiResponse<T>` is defined once and works correctly for any shape of `data`. Without generics you would need separate interface for every response type.

## Generic Constraints

Sometimes you need to restrict what types `T` can be. So, we can use extends to set a constraints:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice", age: 20 };

getProperty(user, "name"); // ✅ Works! Returns string
getProperty(user, "id"); // ✅ Works! Returns number
getProperty(user, "email"); // ❌ Error: Argument of type '"email"' is not assignable to parameter of type '"id" | "name" | "age"'.
```

`K extends keyof T` guarantees that the key you pass actually exists on the object.

## Generic Classes

Classes benefits from generics too:

```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.pop();

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.peek(); // returns string
```

The same `Stack` class works for any type while remaining fully typed throughout.

---

## Conclusion
Generics are what separate a TypeScript codebase that merely avoids `any` from one that is truly reusable and type-safe at scale. This lets you write logic once and have TypeScript enforce correctness for every type that goes through it. Generics are almost always the answer when you find yourself writing the same function for different types, or reaching for `any` to get some flexibility.