import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var foo = 1;
foo = _$rwProx(foo, "foo", () => foo, val => foo = val);
var bar = 2;
bar = _$rwProx(bar, "bar", () => bar, val => bar = val);
var baz = 3;
baz = _$rwProx(baz, "baz", () => baz, val => baz = val);
var boop = 0;
boop = _$rwProx(boop, "boop", () => boop, val => boop = val);
var derp = 1;
derp = _$rwProx(derp, "derp", () => derp, val => derp = val);
export { foo, bar, baz, boop, derp, _$rwRuntime as __RewireAPI__ };