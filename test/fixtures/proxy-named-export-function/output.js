import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime.js';

const _$rwRuntime = _rewireProxyRuntime();

const _$rwProx = _$rwRuntime._add;
export { _$rwRuntime as __RewireAPI__ };
const foo_rewire = {
  bar: 'bar'
};

let foo = _$rwProx(foo_rewire, "foo", () => foo, val => foo = val);

const barFn_rewire = function () {
  const secondLevelVar = foo.bar;
  return secondLevelVar + ' bat';
};

let barFn_proxy_rewire = _$rwProx(barFn_rewire, "barFn", () => barFn);

function barFn(...args) {
  return barFn_proxy_rewire(...args);
}

export { barFn };