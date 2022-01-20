import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import { foo as foo_rewire } from './bar.js';

var foo = _$rwProx(foo_rewire, "foo", () => foo, val => foo = val);

foo.baz = 'qux';
export default foo;
export { foo, _$rwRuntime as __RewireAPI__ };