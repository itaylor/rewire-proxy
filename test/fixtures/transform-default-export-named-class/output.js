import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

class foo {
  constructor() {
    this.foo = 'bar';
  }

}

foo = _$rwProx(foo, "foo", () => foo, val => foo = val);
export default foo;
export { _$rwRuntime as __RewireAPI__ };