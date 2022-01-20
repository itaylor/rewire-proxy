import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

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

var fooFn = () => {
  const secondLevelVar = foo.bar;
  return secondLevelVar + ' baz';
};

fooFn = _$rwProx(fooFn, "fooFn", () => fooFn, val => fooFn = val);

function barFn() {
  const secondLevelVar = foo.bar;
  return secondLevelVar + ' bat';
}

export { fooFn, barFn, _$rwRuntime as __RewireAPI__ };