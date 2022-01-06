"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__RewireAPI__ = void 0;
exports.biffIt = biffIt;
exports.doAllTheThings = doAllTheThings;

var _rewireProxyRuntime = _interopRequireDefault(require("/Users/itaylor/os/babel-plugin-rewire-exports/lib/rewireProxyRuntime.js"));

var _fakeLibrary = _interopRequireWildcard(require("./fakeLibrary.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _$rwRuntime = (0, _rewireProxyRuntime.default)();

exports.__RewireAPI__ = _$rwRuntime;
const _$rwProx = _$rwRuntime.rewireProxyIfNeeded;

let biff = _$rwProx(_fakeLibrary.biff, "biff", () => biff, val => biff = val);

let barFn = _$rwProx(_fakeLibrary.barFn, "barFn", () => barFn, val => barFn = val);

let bar = _$rwProx(_fakeLibrary.bar, "bar", () => bar, val => bar = val);

let foo = _$rwProx(_fakeLibrary.foo, "foo", () => foo, val => foo = val);

let fakeLibrary = _$rwProx(_fakeLibrary.default, "fakeLibrary", () => fakeLibrary, val => fakeLibrary = val);

const doAllTheThings_rewire = function () {
  // I should return a string 
  // 'fooFn, foo, bar, barFn'
  return `${fakeLibrary()}, ${foo()}, ${bar.sayBar()}, ${barFn()}`;
};

let doAllTheThings_proxy_rewire = _$rwProx(doAllTheThings_rewire, "doAllTheThings", () => doAllTheThings);

function doAllTheThings(...args) {
  return doAllTheThings_proxy_rewire(...args);
}

const biffIt_rewire = function () {
  return biff;
};

let biffIt_proxy_rewire = _$rwProx(biffIt_rewire, "biffIt", () => biffIt);

function biffIt(...args) {
  return biffIt_proxy_rewire(...args);
}