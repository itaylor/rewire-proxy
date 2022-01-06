"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__RewireAPI__ = void 0;
exports.barFn = barFn;
exports.fooFn = void 0;

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

var _rewire_fooFn = function _rewire_fooFn() {
  var secondLevelVar = foo.bar;
  return secondLevelVar + ' baz';
};

var fooFn = __RewireAPI__.createProxyIfNeeded(_rewire_fooFn, "fooFn");

exports.fooFn = fooFn;

__RewireAPI__.add({
  setterFn: function setterFn(val) {
    return exports.fooFn = fooFn = val;
  },
  getterFn: function getterFn() {
    return fooFn;
  }
});

var _rewire_barFn = function _rewire_barFn() {
  var secondLevelVar = foo.bar;
  return secondLevelVar + ' bat';
};

var _rewire_proxy_barFn = __RewireAPI__.createProxyIfNeeded(_rewire_barFn, barFn);

__RewireAPI__.add({
  setterFn: function setterFn(val) {
    return _rewire_proxy_barFn = val;
  },
  getterFn: function getterFn() {
    return _rewire_proxy_barFn;
  }
});

function barFn() {
  return _rewire_proxy_barFn.apply(void 0, arguments);
}