import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import * as htmlentity_rewire from './htmlentity';

var htmlentity = _$rwProx(htmlentity_rewire, "htmlentity", () => htmlentity, val => htmlentity = val);

var {
  decodeHtmlEntity,
  encodeHtmlEntity
} = htmlentity;
decodeHtmlEntity = _$rwProx(decodeHtmlEntity, "decodeHtmlEntity", () => decodeHtmlEntity, val => decodeHtmlEntity = val);
encodeHtmlEntity = _$rwProx(encodeHtmlEntity, "encodeHtmlEntity", () => encodeHtmlEntity, val => encodeHtmlEntity = val);
export { decodeHtmlEntity, encodeHtmlEntity, _$rwRuntime as __RewireAPI__ };