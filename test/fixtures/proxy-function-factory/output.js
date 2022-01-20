import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

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