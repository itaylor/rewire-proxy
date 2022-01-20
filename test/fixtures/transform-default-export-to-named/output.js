import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var foo;
export default foo;
export { _$rwRuntime as __RewireAPI__ };