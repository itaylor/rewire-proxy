import _Somelib, { someObj as _whatever } from 'some-non-existent-lib';
var whatever$ProxyHandler = {};
var whatever = new Proxy(_whatever, whatever$ProxyHandler);
var Somelib$ProxyHandler = {};
var Somelib = new Proxy(_Somelib, Somelib$ProxyHandler);
Somelib.doThing();
whatever.fooBar();
export function rewire$Somelib(proxyHandler) {
  Object.keys(Somelib$ProxyHandler).forEach(function (k) {
    return delete Somelib$ProxyHandler[k];
  });
  Object.keys(proxyHandler).forEach(function (k) {
    return Somelib$ProxyHandler[k] = proxyHandler[k];
  });
}
export function rewire$whatever(proxyHandler) {
  Object.keys(whatever$ProxyHandler).forEach(function (k) {
    return delete whatever$ProxyHandler[k];
  });
  Object.keys(proxyHandler).forEach(function (k) {
    return whatever$ProxyHandler[k] = proxyHandler[k];
  });
}
export function restore() {
  Object.keys(Somelib$ProxyHandler).forEach(function (k) {
    return delete Somelib$ProxyHandler[k];
  });
  Object.keys(whatever$ProxyHandler).forEach(function (k) {
    return delete whatever$ProxyHandler[k];
  });
}