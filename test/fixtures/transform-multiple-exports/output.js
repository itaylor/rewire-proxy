import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var _foo = foo;

var foo = _$rwProx(_foo, "foo", () => foo, val => foo = val);

var _bar = bar;

var bar = _$rwProx(_bar, "bar", () => bar, val => bar = val);

function foo() {
  return bar();
}

function* bar() {
  yield baz;
}

var baz = true;
baz = _$rwProx(baz, "baz", () => baz, val => baz = val);

class whatsit extends foo {}

whatsit = _$rwProx(whatsit, "whatsit", () => whatsit, val => whatsit = val);
var whatnot = false;
whatnot = _$rwProx(whatnot, "whatnot", () => whatnot, val => whatnot = val);
var whatever = true;
whatever = _$rwProx(whatever, "whatever", () => whatever, val => whatever = val);
export default foo;
export { bar, bar as qux, baz, whatsit, whatnot, whatever, _$rwRuntime as __RewireAPI__ };