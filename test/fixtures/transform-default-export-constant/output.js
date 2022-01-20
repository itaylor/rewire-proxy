import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var foo = 1;
foo = _$rwProx(foo, "foo", () => foo, val => foo = val);
export default foo;
export { _$rwRuntime as __RewireAPI__ };