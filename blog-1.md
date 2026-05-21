# Why `unknown` is Safer Than `any` for Handling Unpredictable Data in Typescript

## Introduction

The best thing about TypeScript is its type system that catches bug before runtime.At first glance, `any` and `unknown` appear to do the same thing, that is they both accept any values.But the difference between them is the difference between switching off a smoke alarm and having one that only rings when there's real danger.

---

## The Problem with `any`(Type Safety Hole)

When you type a value as `any`, Typescript essentially stops type-checking it. You can call methods, access properties and pass it anywhere. No errors, no warnings, no safety net.

```typescript
function processInput(input: any) {
  console.log(input.toUpperCase()); // No error from typescript
}

processInput(42); // TypeError: input.toUpperCase is not a function
```

From this code snippet it clearly shows why `any` is called a **type safety hole**.It silently punches a gap through TypeScripts's protection. You get the false comfort of writing TypeScript while losing its core benefit.

## The Safer Alternative: `unknown`

`unknown` also accepts any values, but TypeScript **refuses to let you use it** until you prove what type it actually is.It forces you to tell the type before proceeding.

```typescript
function processInput(input: unknown) {
  console.log(input.toUpperCase()); // Error:'input' is of type 'unknown'.
}
```

Here TypeScript is saying, "You told me this could be anything, So prove what it is before you proceed."

## The concept of Type Narrowing

Type narrowing is the process of reducing an `unknown` or union type to a more specific type using different runtime checks. TypeScript understands several type narrowing methods such as:

### Using `typeof`

```typescript
function formatValue(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows it's a string
  }
  if (typeof value === "number") {
    return value.toFixed(2); // TypeScript knows it's a number
  }
}
```

### Using `instanceof`

```typescript
function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred.";
}
```

### Using `in`

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function getInfo(animal: Fish | Bird): string {
  if ("swim" in animal) {
    return "Its a Fish";
  } else {
    return "Its a Bird";
  }
}
```

## Conclusion

`any` is shorthand that sacrifices safety for convenience and the debt eventually comes due at runtime.`unknown` enforces the discipline of type narrowing, makes you prove that what the value is before you proceed. In any production TypeScript codebase, the decision to use `unknown` instead of `any` is not a matter of style, its a commitment to write code worthy of the TypeScript badge.
