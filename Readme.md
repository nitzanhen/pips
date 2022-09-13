<h1 align="center">Pips</h1>

<p align="center">
  A tiny library for declarative, type-safe, elegant pipes
</p>

<pre align="center">
  <code align="center">npm install pips / yarn add pips / pnpm add pips</code>
</pre>

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

<hr/>

<br/>

```ts
const farenheit = 50;
const celsius = pipe(farenheit)((f) => f - 32)((f) => (f * 5) / 9)();

console.log(celsius); // 10

// Code is presented forwards, not backwards, making it clearer:
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const noOdds = pipe(obj)
    ((obj) => Object.entries(obj))
    ((ents) => ents.filter(([k, v]) => v % 2 === 0))
    ((evens) => Object.fromEntries(enens))
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


## The why

### Features

- Write code as humans think - forwards, not backwards.
- Declarative, elegant, clear code
- Expressing using Expressions
- Eliminate gray syntax (`for(;;)`)
- Seriously tiny footprint, in size and runtime.

## How does it work

**_✨ [magic](src/index.ts) ✨_**

## API

Pips exposes a single function `pipe`. It has two signatures:

The first and standard one is `pipe(x)` where x can be just about anything. <br/>
The second, `pipe()`, can be occassionally useful in terms of code style.

Both with create a `Pipe`, which you can think of as a sort of box. <br/>
This box can then be given functions one after another, each of which transform what's inside it. <br>
Finally, when the calculation is complete, we "call" the box with no arguments - `()` - to get the final value from inside it.

Complete signatures can be found in the library's very short [source code](src/index.ts), if you're into that sort of thing.
