import { someObj as _someObj } from 'some-non-existent-lib';
const someObj$ProxyHandler = {};
const someObj = new Proxy(_someObj, someObj$ProxyHandler);
someObj.fooBar();
export function rewire$someObj(proxyHandler) {
  Object.keys(someObj$ProxyHandler).forEach(k => delete someObj$ProxyHandler[k]);
  Object.keys(proxyHandler).forEach(k => someObj$ProxyHandler[k] = proxyHandler[k]);
}
export function restore() {
  Object.keys(someObj$ProxyHandler).forEach(k => delete someObj$ProxyHandler[k]);
}