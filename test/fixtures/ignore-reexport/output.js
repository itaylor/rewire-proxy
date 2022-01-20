import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

export { foo } from './bar.js';
export * from './baz.js';
export { _$rwRuntime as __RewireAPI__ };