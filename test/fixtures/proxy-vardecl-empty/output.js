import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

let foo = _$rwProx("foo", () => foo, val => foo = val);

let bar_rewire = _$rwProx(function bar() {
  foo = 'hello';
  foo.toString();
}, "bar", () => bar);

function bar(...args) {
  return bar_rewire(...args);
}

export { bar, _$rwRuntime as __RewireAPI__ };