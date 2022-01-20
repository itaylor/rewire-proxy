import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import Somelib_rewire, { someFunc as someFunc_rewire } from 'immutable';

var someFunc = _$rwProx(someFunc_rewire, "someFunc", () => someFunc, val => someFunc = val);

var Somelib = _$rwProx(Somelib_rewire, "Somelib", () => Somelib, val => Somelib = val);

export { _$rwRuntime as __RewireAPI__ };