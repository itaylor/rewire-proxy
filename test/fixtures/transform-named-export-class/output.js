import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

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
export { foo, _$rwRuntime as __RewireAPI__ };