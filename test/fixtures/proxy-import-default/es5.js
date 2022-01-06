import _Somelib from 'some-non-existant-lib';
var Somelib$ProxyHandler = {};
var Somelib = new Proxy(_Somelib, Somelib$ProxyHandler);
Somelib.fooBar();
export function rewire$Somelib(proxyHandler) {
  Object.keys(Somelib$ProxyHandler).forEach(function (k) {
    return delete Somelib$ProxyHandler[k];
  });
  Object.keys(proxyHandler).forEach(function (k) {
    return Somelib$ProxyHandler[k] = proxyHandler[k];
  });
}
export function restore() {
  Object.keys(Somelib$ProxyHandler).forEach(function (k) {
    return delete Somelib$ProxyHandler[k];
  });
}