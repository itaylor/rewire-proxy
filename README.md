# babel-plugin-rewire-proxy

This started as a fork of [babel-plugin-rewire-exports](asapach/babel-plugin-rewire-exports) that was going to allow imports as well as exports to be rewired, but ended up as a reimplmentation of most of the [babel-plugin-rewire](https://github.com/speedskater/babel-plugin-rewire) API but using ES6 proxies.

## Installation

```sh
npm install -D @itaylor/babel-plugin-rewire-proxy @itaylor/rewire-proxy-runtime
#  or
yarn add --dev @itaylor/babel-plugin-rewire-proxy @itaylor/rewire-proxy-runtime
```

Then, add this plugin in your `.babelrc` or `.babel.config.js`

```json
{
  "presets": [ "@babel/preset-env" ],
  "plugins": [ "@itaylor/babel-plugin-rewire-proxy" ]
}
```

You may prefer to run the `rewire-proxy` at test time, and not in your production code.
A common way to achieve this is to use the [`env`](https://babeljs.io/docs/en/options#env) property of the babel config.
This works by merging the config for when the `NODE_ENV` var is set to `test`. (Jest sets that env var, and easy to do in Mocha as well).
```json
{ 
  "presets": ["@babel/preset-env"],
  "env": {
    "test": {
      "plugins": [ "@itaylor/babel-plugin-rewire-proxy" ]
    }
  }
}
```
## API
This offers a complete implementation of the APIs defined by `babel-plugin-rewire`, while also adding some alises that are not underscore prefixed/suffixed and are IMO friendlier to use.

To get access to the rewire API, import `__RewireAPI__` from the file you wish to rewire.
```js
import foo, { __RewireAPI__ } from 'path/to/my/file.js'
```
Then you can use the following methods:
## `rewire(name: string, val: any)` 
Changes the rewired file so that the named variable will return the specified value

Arguments:
| `name`  | `string` | The name of the variable to rewire.
| `value` | `any`    | The value to rewire the variable with.  

Returns: 
 `function` | Call this function to reset the variable to the value it had before being rewired. 

Aliases: `__Rewire__`, `__set__`

## `grab(name: string)`
Fetches a value/proxy from the top scope of a rewired file.   Can retrieve values that are not exported.

Arguments:
| `name`  | `string` | The name of the variable to grab.

Returns: 
| `unknown` | The value of the variable with the name passed in, or `undefined` if it doesn't exist |

Aliases: `__get__`, `__GetDependency__`

## `restore(name: string)`
Restores a previously rewired object to its pre-rewired value

Arguments:
| `name`  | `string` | The name of the variable to restore.

Returns: `undefined`

Aliases: `__ResetDependency__`

## `restoreAll()`
Restores all rewired objects to their pre-rewired value;

Returns: `undefined`

Aliases: `globalThis.__rewire_reset_all__`

## Preventing files from being processed by this plugin

If there are files that you do not wish to have this plugin process, add a comment containing
`rewire-ignore` to the file.  The entire file will be skipped by this plugin.  This is advisable for libraries that serve as wrappers over `__RewireAPI__`, and can also be used an an escape hatch to work around bugs with the plugin's transforms.

```js 
// rewire-ignore
function someFunctionIDontWantRewired() {
  spookyStuffHere();
}
```

## Understanding differences between this and `babel-plugin-rewire` 

Both of these plugins allow users to change the behavior inside of modules from outside of the module, without modifying the code.  This implements most of the same API as `babel-plugin-rewire`, but it works very differently.  To illustrate here's a simple piece of example code:

```js
import { readFileSync } from 'fs';
export default function readMyFileAndMakeItBetter(fileName) {
  return readFileSync(fileName, 'utf8') + ' this makes it better!';
}
```

Here's a vastly simplified example of what `babel-plugin-rewire` is trying to do that code.  It's changing the code to make lookups within the code dynamic, so that they can be overwritten later, and exposing an API that allows that overriding to happen.
```js
import { readFileSync } from 'fs';
const __rewired = { readFileSync };

export default function readMyFileAndMakeItBetter(fileName) {
  return __rewired['readFileSync'](fileName, 'utf8') + ' this makes it better!';
}

export { __RewireAPI__: {
  __Rewire__: (name, val) => __rewired[name] = val; 
}}
```
I can now call `__RewireAPI__.__Rewire__('readFileSync', () => 'hello')` from any other file and the output of `readMyFileAndMakeItBetter` will change.

Here's a vastly simplified example of what this plugin is trying to do to the same code.  It's changing objects in the top 
top level scope to ES6 proxies that target that reference, then allowing to control the Proxy Handler at a later time.
```js
import { readFileSync as _readFileSync } from 'fs';
const _proxyHandlers = { readFileSync: {} });
const readFileSync = new Proxy(_readFileSync, _proxyHandlers.readFileSync);

export default function readMyFileAndMakeItBetter(fileName) {
  return readFileSync(fileName, 'utf8') + ' this makes it better!';
}
export { __RewireAPI__ : {
  __Rewire__: (name, val) => {
    proxyHandlers[name] = { apply: val }
  }
}
```
Now I can call the same API: `__RewireAPI__.__Rewire__('readFileSync', () => 'hello')` on this module and get the same result.  The main difference is that `babel-plugin-rewire-proxy` *will not ever* change the code within your functions/classes.  Instead it changes names of variables that are in the top level scope of your functions.  This is less invasive and therefore inherently less prone to weird bugs and interactions with other plugins/language features.
## Other differences with `babel-plugin-rewire`
* Relies on a runtime API that is imported instead of compiling the entirety of the rewire implementation in to each function.  This results in needing to install two packages, but the amount of additional code added to each file is minimal.  
* Exports don't change equality when rewired.   
```js
import { foo } from 'bar';
const mockFoo = () => {};
const fooBefore = foo;
__RewireAPI__.__Rewire__('foo', mockFoo);
foo === mockFoo; //false, but would be true in babel-plugin-rewire
fooBefore === foo; //true, but would be false in babel-plugin-rewire
```

## But proxies only work on Objects/Functions!
True.  This allows value types to be set instead of proxied.  Those do change values when set.

```js
import { fooVar } from 'bar';
const fooVarBefore = fooVar;
__RewireAPI__.__Rewire__('foo', 5);
fooVar === 5 // true 
fooBarBefore === fooVar; // false
```
## Should I use this?
If you're looking for a way to override things in your production code, probably not, it's likely better to just fork the code you're trying to override and deal with it that way.  If you're wanting to mock code for tests, then maybe.  The big advantage of this over other mocking tools is the ability to alter single functions/methods/objects within a file without altering the rest of the file, and without having to manually create mocks for everything else in the file.  If you're already using `babel-plugin-rewire`, and are looking for a less invasive, more up-to-date version of its API, then yes perhaps you'd like to give this a try.  It should only take a few minutes to swap plugins and rerun your tests.  In general, I tend to agree with [@thekashey](https://dev.to/thekashey/please-stop-playing-with-proxyquire-11j4) that these sorts of tools are fun toys to play with, but not fit for responsible use.