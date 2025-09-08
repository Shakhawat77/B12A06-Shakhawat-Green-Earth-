## WELCOME TO ( সহজ সরল সিম্পল ) ASSIGNMENT-006

### What is the difference between var, let, and const?
1. var → Old box

a. Can be accessed anywhere in the function, even outside a block { }.
b.  Can change the value.
c. Can create the same box twice, which can be confusing.

2. let → New box

a. Can only be used inside the block { } where you made it.
b. Can change the value.
c. Cannot create the same box twice in the same block.

3. const → Locked box

a. Can only be used inside the block { }.
b. Cannot change the value.
c. Good for things that should stay the same.

### What is the difference between map(), forEach(), and filter()?
1️. forEach() → Just go through the array

a. Loops through every item in an array.
b. Does not return anything.
c. Usually used for side effects (like printing to console or updating the DOM).

2️. map() → Make a new array

a. Loops through every item in an array.
b. Returns a new array of the same length.
c. Does not change the original array.

3️. filter() → Pick only some items

a. Loops through every item in an array.
b. Returns a new array with only the items that match a condition.

###  What are arrow functions in ES6?

a. Arrow functions are a shorter syntax for writing functions introduced in ES6.
b. They inherit this from the surrounding scope instead of having their own.
c. If the function has a single expression, you can omit the {} and return.
d. Parentheses around parameters can be omitted if there’s only one parameter.

They are mainly used for concise and readable code, especially for small functions.

###  How does destructuring assignment work in ES6?

Destructuring allows you to extract values from arrays or objects and assign them to variables in a concise way. It reduces the need for repetitive code when accessing properties or array elements.

Main points are:
a. Array destructuring: Assign elements of an array to variables in order.
b. Object destructuring: Assign object properties to variables with matching names.
c. Can be used with nested arrays/objects, default values, and function parameters.

###  Explain template literals in ES6. How are they different from string concatenation?

Template literals are a new way to write strings using backticks (`) instead of quotes (' or ").They allow embedding variables or expressions directly inside a string using ${}.They support multi-line strings without using \n.

Main differences from regular string concatenation:

a. Variable embedding: You can insert variables or expressions directly inside a string using ${} instead of using +.
b. Multi-line strings: You can write strings across multiple lines naturally without using \n.
c. Readability: Template literals make complex strings much cleaner and easier to read compared to concatenating many parts with +.

---
