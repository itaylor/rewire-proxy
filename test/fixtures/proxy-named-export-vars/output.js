import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

let foo = _$rwProx(1, "foo", () => foo, val => foo = val);

let bar = _$rwProx(2, "bar", () => bar, val => bar = val);

let baz = _$rwProx(3, "baz", () => baz, val => baz = val);

let boop = _$rwProx(0, "boop", () => boop, val => boop = val);

let derp = _$rwProx(1, "derp", () => derp, val => derp = val);

export { foo, bar, baz, boop, derp, _$rwRuntime as __RewireAPI__ };