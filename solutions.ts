//Problem 1 solve:
function filterEvenNumbers(numArray: number[]): number[] {
  return numArray.filter((num) => num % 2 === 0);
}

//Problem 2 solve:
function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

//Problem 3 solve:
type StringOrNumber = string | number;

function checkType(value: StringOrNumber): "String" | "Number" {
  if (typeof value === "string") return "String";
  return "Number";
}

//Problem 4 solve:
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

//Problem 5 solve:
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

function toggleReadStatus(obj: Book) {
  return { ...obj, isRead: true };
}

//Problem 6 solve:
class Person {
  constructor( public name: string, public age: number) {}
}
class Student extends Person {
  constructor(name: string, age: number, public grade: string) {
    super(name, age);
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

//Problem 7 solve:
function getIntersection (arr1: number[], arr2: number[]):number[]{
    const set = new Set(arr2);
    return arr1.filter((n) => set.has(n));
}