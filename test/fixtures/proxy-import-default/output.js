import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime.js';

const _$rwRuntime = _rewireProxyRuntime();

const _$rwProx = _$rwRuntime._add;
export { _$rwRuntime as __RewireAPI__ };
import Somelib_rewire from 'some-non-existent-lib';

let Somelib = _$rwProx(Somelib_rewire, "Somelib", () => Somelib, val => Somelib = val);

Somelib.fooBar();