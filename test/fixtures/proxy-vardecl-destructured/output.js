import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import * as htmlentity_rewire from './htmlentity'; // FIXME: This is not currently handled correctly.

let htmlentity = _$rwProx(htmlentity_rewire, "htmlentity", () => htmlentity, val => htmlentity = val);

const {
  decodeHtmlEntity,
  encodeHtmlEntity
} = htmlentity;
export { _$rwRuntime as __RewireAPI__ };