import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

function _default() {
  return null;
}

export default _default;
export { _$rwRuntime as __RewireAPI__ };