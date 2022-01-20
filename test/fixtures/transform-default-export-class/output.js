import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

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