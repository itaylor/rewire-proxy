var _rewireObjects = {};
import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime.js';
export var __RewireAPI__ = _rewireProxyRuntime(_rewireObjects);
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

__RewireAPI__.add({
  setterFn: function setterFn(val) {
    return fooFn = val;
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

export { fooFn, barFn };