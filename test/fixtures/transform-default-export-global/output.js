import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

const _default = foo;
export default _default;
export { _$rwRuntime as __RewireAPI__ };