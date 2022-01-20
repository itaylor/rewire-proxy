import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import * as biff_rewire from 'some-non-existent-lib';

var biff = _$rwProx(biff_rewire, "biff", () => biff, val => biff = val);

biff.something();
export { _$rwRuntime as __RewireAPI__ };