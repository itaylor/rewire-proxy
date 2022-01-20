import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import { someObj as someObj_rewire } from 'some-non-existent-lib';

var someObj = _$rwProx(someObj_rewire, "someObj", () => someObj, val => someObj = val);

someObj.fooBar();
export { _$rwRuntime as __RewireAPI__ };