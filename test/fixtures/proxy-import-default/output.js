import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import Somelib_rewire from 'some-non-existent-lib';

let Somelib = _$rwProx(Somelib_rewire, "Somelib", () => Somelib, val => Somelib = val);

Somelib.fooBar();
export { _$rwRuntime as __RewireAPI__ };