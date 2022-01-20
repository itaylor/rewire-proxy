import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import foo_rewire from './bar.js';

var foo = _$rwProx(foo_rewire, "foo", () => foo, val => foo = val);

foo.baz = 'qux';
export default foo;
export { foo, _$rwRuntime as __RewireAPI__ };