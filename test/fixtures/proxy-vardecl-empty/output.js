import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var _bar = bar;

var bar = _$rwProx(_bar, "bar", () => bar, val => bar = val);

let foo;

function bar() {
  foo = 'hello';
  foo.toString();
}

export { bar, _$rwRuntime as __RewireAPI__ };