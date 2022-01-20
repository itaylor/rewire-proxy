import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var foo = 'bar';
foo = _$rwProx(foo, "foo", () => foo, val => foo = val);
var baz = 'qux';
baz = _$rwProx(baz, "baz", () => baz, val => baz = val);
var whatsit = false;
whatsit = _$rwProx(whatsit, "whatsit", () => whatsit, val => whatsit = val);
export { foo, baz, whatsit, _$rwRuntime as __RewireAPI__ };