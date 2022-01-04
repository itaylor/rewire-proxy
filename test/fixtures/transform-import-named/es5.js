import { someObj as _someObj } from 'some-non-existent-lib';
var someObj$ProxyHandler = {};
var someObj = new Proxy(_someObj, someObj$ProxyHandler);
someObj.fooBar();
export function rewire$someObj(proxyHandler) {
  Object.keys(someObj$ProxyHandler).forEach(function (k) {
    return delete someObj$ProxyHandler[k];
  });
  Object.keys(proxyHandler).forEach(function (k) {
    return someObj$ProxyHandler[k] = proxyHandler[k];
  });
}
export function restore() {
  Object.keys(someObj$ProxyHandler).forEach(function (k) {
    return delete someObj$ProxyHandler[k];
  });
}