<h1 align="center">Pips</h1>

<p align="center">
  A tiny library for declarative, type-safe, elegant pipes.
</p>



<p align="center">
  <a href="https://www.npmjs.com/package/pips">
    <img src="https://img.shields.io/npm/v/pips" alt="npm" />
  </a>
  <a href="https://bundlephobia.com/package/pips">
    <img src="https://badgen.net/bundlephobia/minzip/pips" alt="size" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/github/languages/top/nitzanhen/pips" alt="typescript" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/github/license/nitzanhen/pips?color=blue" alt="license" />
  </a>
</p>


<br/>

<pre>
  <code>npm install pips / yarn add pips / pnpm add pips</code>
</pre>

```ts
const farenheit = 50;
const celsius = pipe(farenheit)
    (f => f - 32)
    (f => (f * 5) / 9)
  ();

console.log(celsius); // 10

// Code is presented forwards, not backwards, making it clearer:
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const noOdds = pipe(obj)
    (obj => Object.entries(obj))
    (ents => ents.filter(([k, v]) => v % 2 === 0))
    (evens => Object.fromEntries(enens))
  ();

console.log(noOdds); // { b: 2, d: 4 };

// Make it even better with FP utility libs such as rhax, lodash or ramda:
import { entries, filter, toObject } from "rhax";

const obj2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const noOdds2 = pipe(obj)
    (entries)
    (filter.object(([k, v]) => v % 2 === 0))
    (toObject)
  ();

console.log(noOdds2); // { b: 2, d: 4 };
```

## Features

- 🧠 Write code the way humans think - forwards, not backwards.
- ☀️ Write declarative, elegant, clear code.
- 🎨 Replace clumsy code blocks with expressive expressions.
- 🌱 Virtually no footprint, in size and runtime.

## API

Pips exposes a single function `pipe` that creates a `Pipe`, which you can think of as some sort of box. You can give this box a value (e.g. `pipe(x)`) and it'll hold it, or create an "empty" box with `pipe()`. 

This box can then be given functions one after another, each of which transform what's inside it. <br>

Finally, when our computation is complete, we can get the value inside the box back by calling it with no arguments - `()`.

Complete signatures can be found in the library's very short [source code](src/index.ts), if you're into that sort of thing.


## The why

Let's demonstrate the motivation for using pips with an example.

You have an object (`Record`) with `Todo` objects as values and their ids (unique strings) as keys. You want to filter it and get a new record with the same structure, but whose entries contain only the *ongoing* todos (indicated by a `completed` field).
  
Let's tackle the problem in its general form: <br/>
You want to implement a variant of `Array.filter` for objects - given an object, you want to return another object containing a subset of the original's entries, based on some `condition` (a function that takes a value, and returns `true` if it's to be kept or `false` otherwise).

There are many ways to implement this. We'll compare a couple:

Using good ol' `for` loops and imperative style:

```ts
function filterObject<T>(record: Record<string, T>, condition: (v: T) => boolean) {
  const filtered = {};
  for(const [k, v] of Object.entries(record)) {
    if(confition(v)) {
      filtered[k] = v;
    }
  }

  return filtered;
}
```

It's a good start, but imperative code is more prone to (developer) errors, and it contains a lot of "gray syntax" mixed with actual logic.

Next, using modern syntax, with a preference for array methods over loops:
```ts
const filterObject = <T>(record: Record<string, T>, condition: (v: T) => boolean) =>
  Object.fromEntries(
    Object.entries(record).filter(([k, v]) => condition(v))
  );
```

This one is shorter, somewhat more declarative, and less prone to (developer) errors, but the logic is still all over the place! <br/>
The code is structured as such - return the object created from the entries gained by `record`'s entries by filtering key-value pairs based on `condition`. 

It's correct, but you likely took a moment to wrap your head around what that sentence exactly means; and it's not because of you, but rather the code's messy order of operations!

In abstract, we humans deal much better with understanding a process linearily, in the way that it actually unfolds. In simple terms, **we think forwards, not backwards**. <br/>
This is the reason people have a hard time with recursion, and, more generally, this is why function composition (in the sciences, especially math) is tricky - We see `f(g(h(x)))`, and we think `f` is first, then `g`, then `h`, but in reality it's the other way around - we take `x` and throw it into `h`, then throw the result to `g`, then into `f`. 

Let's rephrase, then, the above computation in a way that makes sense to humans:
Given a `record` and a `condition`,
1. Get the entries of `record`
2. Filter them based on the `condition`
3. Turn it back to an object

Now it seems simple, and a lot clearer! <br/>
Note that this is a concrete example of our point about composition - if:
- `f` is "turn object to entries"
- `g` is "filter entries based on condition"
- `h` is "turn entries to object"

Then "filter an object `x` based on condition" is `h(g(f(x)))` - but that's an awkward and unclear way to present it.

Using a pipe, we can implement the solution "forwards", just as we would reason about it:

```ts
const filterObject = <T>(record: Record<string, T>, condition: (v: T) => boolean) =>
  pipe(record)
    (it => Object.entries(it))
    (it => it.filter(([k, v]) => condition(v)))
    (it => Object.fromEntries(it))
  ();
```

This code already presents a few benefits - it's declarative, elegant and clear; it's an expression, which are generally more convenient than code blocks (compare the ternary operation's conciseness to an `if-else` block, with brackets and all). <br/>

But, most importantly, the code above **expresses the computation in the way that you'd reason about it** - it lists the steps in the order they play out. This makes it easier to understand, spot bugs in, and maintain in the long run.

As another added bonus, using a pipe saves you the trouble of coming up with awkward semi-descriptive variable names for the steps inside a computation: <br/>
Think of the pipe as a box with some value inside. You can give the box a function, and it'll apply it to the value, giving you another box with the transformed value inside. Then you can give it another function, and so on.

Referring to the current value as "*what's inside the box*" (`it` in the example above) saves you the trouble of coming up with descriptive names for each step - instead of `entries`, `filteredEntries` and `filteredRecord`, you have three `it`s, without compromising the code's clarity.

<br/>

Finally, Using utility methods (or a utility library such as Rhax) we can make the code even better, and also achieve optimal type inference:

```ts
import { entries, filter, toObject } from 'rhax';

const filterObject = <T>(record: Record<string, T>, condition: (v: T) => boolean) =>
  pipe(record)
    (entries)
    (filter(([k, v]) => condition(v)))
    (toObject)
  ();
```

Compare that to the first two examples!

## How is it implemented?

**_✨ [magic](src/index.ts) ✨_**
