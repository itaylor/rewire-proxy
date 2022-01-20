import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var _functionFactory = functionFactory;

var functionFactory = _$rwProx(_functionFactory, "functionFactory", () => functionFactory, val => functionFactory = val);

var DoTheThing = functionFactory(() => {});
DoTheThing = _$rwProx(DoTheThing, "DoTheThing", () => DoTheThing, val => DoTheThing = val);

function functionFactory(func) {
  return () => func();
}

export { DoTheThing, _$rwRuntime as __RewireAPI__ };