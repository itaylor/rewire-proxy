"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restore = restore;
exports.rewire$Somelib = rewire$Somelib;

var _Somelib = _interopRequireWildcard(require("some-non-existant-lib"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Somelib$ProxyHandler = {};
var Somelib = new Proxy(_Somelib, Somelib$ProxyHandler);
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