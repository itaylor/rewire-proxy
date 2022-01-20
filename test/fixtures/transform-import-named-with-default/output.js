import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import Somelib_rewire, { someObj as whatever_rewire } from 'some-non-existent-lib';

var whatever = _$rwProx(whatever_rewire, "whatever", () => whatever, val => whatever = val);

var Somelib = _$rwProx(Somelib_rewire, "Somelib", () => Somelib, val => Somelib = val);

Somelib.doThing();
whatever.fooBar();
export { _$rwRuntime as __RewireAPI__ };