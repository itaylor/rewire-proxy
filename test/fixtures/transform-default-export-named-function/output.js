import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var _foo = foo;

var foo = _$rwProx(_foo, "foo", () => foo, val => foo = val);

function foo() {
  return null;
}

export default foo;
export { _$rwRuntime as __RewireAPI__ };