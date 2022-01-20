import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import * as Somelib_rewire from 'some-non-existant-lib';

var Somelib = _$rwProx(Somelib_rewire, "Somelib", () => Somelib, val => Somelib = val);

Somelib.fooBar();
export { _$rwRuntime as __RewireAPI__ };