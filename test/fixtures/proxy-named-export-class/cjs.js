"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__RewireAPI__ = void 0;
exports.barFn = barFn;

var _rewire__rewireProxyRuntime = _interopRequireDefault(require("/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime.js"));

var _rewireProxyRuntime = __RewireAPI__.createProxyIfNeeded(_rewire__rewireProxyRuntime, "_rewireProxyRuntime");

__RewireAPI__.add({
  setterFn: function setterFn(val) {
    return _rewireProxyRuntime = val;
  },
  getterFn: function getterFn() {
    return _rewireProxyRuntime;
  }
});

var _rewire__interopRequireDefault = function _rewire__interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

var _rewire_proxy__interopRequireDefault = __RewireAPI__.createProxyIfNeeded(_rewire__interopRequireDefault, _interopRequireDefault);

__RewireAPI__.add({
  setterFn: function setterFn(val) {
    return _rewire_proxy__interopRequireDefault = val;
  },
  getterFn: function getterFn() {
    return _rewire_proxy__interopRequireDefault;
  }
});

function _interopRequireDefault() {
  return _rewire_proxy__interopRequireDefault.apply(void 0, arguments);
}

var _rewireObjects = {};

var __RewireAPI__ = (0, _rewireProxyRuntime["default"])(_rewireObjects);

exports.__RewireAPI__ = __RewireAPI__;
var _rewire_foo = {
  bar: 'bar'
};

var foo = __RewireAPI__.createProxyIfNeeded(_rewire_foo, "foo");

__RewireAPI__.add({
  setterFn: function setterFn(val) {
    return foo = val;
  },
  getterFn: function getterFn() {
    return foo;
  }
});

function barFn() {
  var secondLevelVar = foo.bar;
  return secondLevelVar + ' bat';
}