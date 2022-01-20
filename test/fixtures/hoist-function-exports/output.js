import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var _foo = foo;

var foo = _$rwProx(_foo, "foo", () => foo, val => foo = val);

var _baz = baz;

var baz = _$rwProx(_baz, "baz", () => baz, val => baz = val);

foo.bar = baz;

function foo() {
  return null;
}

function baz() {
  return false;
}

export default foo;
export { baz, _$rwRuntime as __RewireAPI__ };