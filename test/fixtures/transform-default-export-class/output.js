import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

class _default {
  constructor() {
    this.foo = 'bar';
  }

}

_default = _$rwProx(_default, "_default", () => _default, val => _default = val);
export default _default;
export { _$rwRuntime as __RewireAPI__ };