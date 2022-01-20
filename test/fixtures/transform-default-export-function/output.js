import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

function _default() {
  return null;
}

export default _default;
export { _$rwRuntime as __RewireAPI__ };