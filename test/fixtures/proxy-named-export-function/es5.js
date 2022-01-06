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

export function barFn() {
  var secondLevelVar = foo.bar;
  return secondLevelVar + ' bat';
}