import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import { foo as foo_rewire } from "../../import/fakeLibrary";

let foo = _$rwProx(foo_rewire, "foo", () => foo, val => foo = val);

let Foob = _$rwProx(class Foob {
  someMethod() {
    return 'cool';
  }

}, "Foob", () => Foob, val => Foob = val);

let Bar = _$rwProx(class Bar {
  doThing() {
    return 0;
  }

}, "Bar", () => Bar, val => Bar = val);

export { Foob, Bar, _$rwRuntime as __RewireAPI__ };