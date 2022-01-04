import _Somelib, { someObj as _whatever } from 'some-non-existent-lib';
const whatever$ProxyHandler = {};
const whatever = new Proxy(_whatever, whatever$ProxyHandler);
const Somelib$ProxyHandler = {};
const Somelib = new Proxy(_Somelib, Somelib$ProxyHandler);
Somelib.doThing();
whatever.fooBar();
export function rewire$Somelib(proxyHandler) {
  Object.keys(Somelib$ProxyHandler).forEach(k => delete Somelib$ProxyHandler[k]);
  Object.keys(proxyHandler).forEach(k => Somelib$ProxyHandler[k] = proxyHandler[k]);
}
export function rewire$whatever(proxyHandler) {
  Object.keys(whatever$ProxyHandler).forEach(k => delete whatever$ProxyHandler[k]);
  Object.keys(proxyHandler).forEach(k => whatever$ProxyHandler[k] = proxyHandler[k]);
}
export function restore() {
  Object.keys(Somelib$ProxyHandler).forEach(k => delete Somelib$ProxyHandler[k]);
  Object.keys(whatever$ProxyHandler).forEach(k => delete whatever$ProxyHandler[k]);
}