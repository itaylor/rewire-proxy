"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restore = restore;
exports.rewire$someObj = rewire$someObj;

var _someNonExistentLib = require("some-non-existent-lib");

var someObj$ProxyHandler = {};
var someObj = new Proxy(_someNonExistentLib.someObj, someObj$ProxyHandler);
someObj.fooBar();

function rewire$someObj(proxyHandler) {
  Object.keys(someObj$ProxyHandler).forEach(function (k) {
    return delete someObj$ProxyHandler[k];
  });
  Object.keys(proxyHandler).forEach(function (k) {
    return someObj$ProxyHandler[k] = proxyHandler[k];
  });
}

function restore() {
  Object.keys(someObj$ProxyHandler).forEach(function (k) {
    return delete someObj$ProxyHandler[k];
  });
}