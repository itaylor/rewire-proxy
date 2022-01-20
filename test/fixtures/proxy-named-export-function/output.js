import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var _barFn = barFn;

var barFn = _$rwProx(_barFn, "barFn", () => barFn, val => barFn = val);

var foo = {
  bar: 'bar'
};
foo = _$rwProx(foo, "foo", () => foo, val => foo = val);

function barFn() {
  const secondLevelVar = foo.bar;
  return secondLevelVar + ' bat';
}

export { barFn, _$rwRuntime as __RewireAPI__ };