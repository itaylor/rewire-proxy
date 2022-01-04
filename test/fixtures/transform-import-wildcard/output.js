import * as _Somelib from 'some-non-existant-lib';
const Somelib$ProxyHandler = {};
const Somelib = new Proxy(_Somelib, Somelib$ProxyHandler);
Somelib.fooBar();
export function rewire$Somelib(proxyHandler) {
  Object.keys(Somelib$ProxyHandler).forEach(k => delete Somelib$ProxyHandler[k]);
  Object.keys(proxyHandler).forEach(k => Somelib$ProxyHandler[k] = proxyHandler[k]);
}
export function restore() {
  Object.keys(Somelib$ProxyHandler).forEach(k => delete Somelib$ProxyHandler[k]);
}