/**
 * This file covers TS basics
 * Covering how to understand, create , and assign different types
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// basic type assignment
var userName = "Max";
// userName = 34;
userName = "Max";
var userAge = 34;
var isValid = true;
var userID = "abc1";
userID = 123;
var user;
// user = 'Max';
user = {
    name: "Max",
    age: 34,
    isAdmin: true,
    id: "abc", // 123
};
// user = {};
// let hobbies: Array<string>; // can use Generic version but can make code harder to read
var hobbies; // this creates an array that stores strings, other types of arrays can be number[], boolean[]
// {name: string; age: number}[] // creating an array of objects
hobbies = ["Sports", "Cooking", "Reading"];
// hobbies = [1, 2, 3];
// Functions and Types - adding types to functions (parameters and return value types)
function add(a, b) {
    var result = a + b;
    return result;
}
// Defining Function Types
// one way of defining Function Types:
// function calculate(a: number, b: number, calcFn: (a: number, b: number) => number) {
function calculate(a, b, calcFn) {
    calcFn(a, b);
}
calculate(2, 5, add);
// easily extendable / declarative merged
// interface Credentials {
//   mode: string;
// }
var creds;
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
var AuthCredentials = /** @class */ (function () {
    function AuthCredentials() {
    }
    return AuthCredentials;
}());
function login(credentials) { }
login(new AuthCredentials()); // a function can take a class that implements the expected interface type only if that specific interface is being implemented
var admin;
admin = {
    permissions: ["login"],
    userName: "Max",
};
var role; // 'admin', 'user', 'editor'
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
function performAction(action, role) {
    if (role === "admin" && typeof action === "string") {
        // ...
    }
}
/* Generic Types
 * Generic types are types that work together with other types
 * Can build my own generic type
 */
var roles; // this could be another way => Role[]
roles = ["admin", "editor"];
var textStorage = {
    storage: [],
    add: function (data) {
        this.storage.push(data);
    },
};
var userStorage = {
    storage: [],
    add: function (user) { },
};
// defining a generic function with multiple types
function merge(a, b) {
    return __assign(__assign({}, a), b);
}
var newUser = merge({ name: "Max" }, { age: 34 });
console.log(newUser);
