/**
 * This file covers TS basics
 * Covering how to understand, create , and assign different types
 */

// basic type assignment
let userName = "Max";

// userName = 34;
userName = "Max";

let userAge = 34;

let isValid = true;

// string, number, boolean are the basic types

// Creating custom Types with type aliases / using the 'type' keyword
type StringOrNum = string | number;

let userID: StringOrNum = "abc1";
userID = 123;

// userID = true;

// let user: object; // the 'object' keyword isnt the best because it doesnt give us hints of the expected structure of an object without type safety
type User = {
  name: string;
  age: number;
  isAdmin: boolean;
  id: string | number;
};

let user: User;

// user = 'Max';

user = {
  name: "Max",
  age: 34,
  isAdmin: true,
  id: "abc", // 123
};

// user = {};

// let hobbies: Array<string>; // can use Generic version but can make code harder to read
let hobbies: string[]; // this creates an array that stores strings, other types of arrays can be number[], boolean[]

// {name: string; age: number}[] // creating an array of objects

hobbies = ["Sports", "Cooking", "Reading"];
// hobbies = [1, 2, 3];

// Functions and Types - adding types to functions (parameters and return value types)
function add(a: number, b: number) {
  const result = a + b;
  return result;
}

// Custom types and type aliases / using the 'type' keyword
type AddFn = (a: number, b: number) => number;

// Defining Function Types
// one way of defining Function Types:
// function calculate(a: number, b: number, calcFn: (a: number, b: number) => number) {
function calculate(a: number, b: number, calcFn: AddFn) {
  calcFn(a, b);
}

calculate(2, 5, add);

// Another way to define Object Types - Interfaces
// this is creating/defining the object shape NOT assigning (using the '=' sign) a value
interface Credentials {
  password: string;
  email: string;
}

// easily extendable / declarative merged
// interface Credentials {
//   mode: string;
// }

let creds: Credentials;

// this is assigning an object value NOT creating/defining the object shape
creds = {
  password: "abc",
  email: "test@example.com",
};

// start 'interface' vs 'type' notes
/*
 * In General, can always use the 'type' keyword - can be used to define function types too
 * interfaces are limited to only defining objects
 *
 * interfaces can be implemented into class objects - this forces properties and methods defined in an interface, into a class. Can add new properties and methods but MUST have at least the properties and methods defined in the interface
 * best used in js/ts projects that use 'classes'
 * easily extendable / declarative merging ( e.g. above ^ :
interface Credentials {
  password: string;
  email: string;
}

interface Credentials {
  mode: string;
})
 */
// end 'interface' vs 'type' notes

// interfaces can be implemented into class objects
class AuthCredentials implements Credentials {
  email: string;
  password: string;
  userName: string;
}

function login(credentials: Credentials) {}

login(new AuthCredentials()); // a function can take a class that implements the expected interface type only if that specific interface is being implemented

// Merging 'type's
// type Admin = {
//   permissions: string[]
// };

// type AppUser = {
//   userName: string;
// }

// type AppAdmin = Admin & AppUser; // this merges two types - using the '&' symbol

// let admin: AppAdmin;

// admin = {
//   permissions: ['login'],
//   userName: 'Max'
// }

// Merging 'interface's
interface Admin {
  permissions: string[];
}

interface AppUser {
  userName: string;
}

// can merge types with interfaces - using 'extends' and commas to merge more than one interface type
interface AppAdmin extends Admin, AppUser {}

let admin: AppAdmin;

admin = {
  permissions: ["login"],
  userName: "Max",
};

type Role = "admin" | "user" | "editor";

let role: Role; // 'admin', 'user', 'editor'

role = "admin";
role = "user";
role = "editor";
// role = 'abc';

// Type Guards - checking for a certain type before running code that may contain different Union Type values
/*
 * You can NOT check if a value meets the definition of a custom type (type alias) or interface type. These are TypeScript-specific features for which no JavaScript equivalent exists. Therefore, since those if checks need to run at runtime, you can't write any code that would be able to check for those types at runtime.
 * For example, the below code won't work because the User type does not exist once the code is compiled to JavaScript:

type User = {
  name: string;
  age: number;
};
 
type Admin = {
  name: string;
  age: number;
  permissions: string[];
};
 
function login(u: User | Admin) {
  if (typeof u === User) {
    // do something
  }
}
 * But you could check for the existence of the permissions property since only the Admin object will have one:

function login(u: User | Admin) {
  if ('permissions' in u) {
    // do something
  }
}
 * This code would work at runtime.
 */
function performAction(action: string | number, role: Role) {
  if (role === "admin" && typeof action === "string") {
    // ...
  }
}

/* Generic Types
 * Generic types are types that work together with other types
 * Can build my own generic type
 */
let roles: Array<Role>; // this could be another way => Role[]
roles = ["admin", "editor"];

// * Can build my own generic type
// If I'm unsure of the type that will be used can be covered by using 'T' for "Type"
// * can use multiple types by adding commas (<T, U, F, etc...>)
type DataStorage<T> = {
  storage: T[];
  add: (data: T) => void;
};

const textStorage: DataStorage<string> = {
  storage: [],
  add(data) {
    this.storage.push(data);
  },
};

const userStorage: DataStorage<User> = {
  storage: [],
  add(user) {},
};

// defining a generic function with multiple types
function merge<T, U>(a: T, b: U) {
  return {
    ...a,
    ...b,
  };
}

const newUser = merge({ name: "Max" }, { age: 34 });
console.log(newUser);
