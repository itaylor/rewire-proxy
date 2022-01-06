import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

let foo = _$rwProx({
  bar: 'bar'
}, "foo", () => foo, val => foo = val);

let fooFn = _$rwProx(() => {
  const secondLevelVar = foo.bar;
  return secondLevelVar + ' baz';
}, "fooFn", () => fooFn, val => fooFn = val);

let barFn_rewire = _$rwProx(function barFn() {
  const secondLevelVar = foo.bar;
  return secondLevelVar + ' bat';
}, "barFn", () => barFn);

function barFn(...args) {
  return barFn_rewire(...args);
}

export { fooFn, barFn, _$rwRuntime as __RewireAPI__ };