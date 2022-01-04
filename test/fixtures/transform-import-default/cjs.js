"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restore = restore;
exports.rewire$Somelib = rewire$Somelib;

var _someNonExistantLib = _interopRequireDefault(require("some-non-existant-lib"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Somelib$ProxyHandler = {};
var Somelib = new Proxy(_someNonExistantLib["default"], Somelib$ProxyHandler);
Somelib.fooBar();

function rewire$Somelib(proxyHandler) {
  Object.keys(Somelib$ProxyHandler).forEach(function (k) {
    return delete Somelib$ProxyHandler[k];
  });
  Object.keys(proxyHandler).forEach(function (k) {
    return Somelib$ProxyHandler[k] = proxyHandler[k];
  });
}

function restore() {
  Object.keys(Somelib$ProxyHandler).forEach(function (k) {
    return delete Somelib$ProxyHandler[k];
  });
}