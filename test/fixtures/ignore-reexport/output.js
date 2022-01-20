import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

export { foo } from './bar.js';
export * from './baz.js';
export { _$rwRuntime as __RewireAPI__ };