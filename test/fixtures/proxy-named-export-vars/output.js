import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime.js';
export const __RewireAPI__ = _rewireProxyRuntime();
const _$rwProx = __RewireAPI__.createProxyIfNeeded;
const foo_rewire = 1;

let foo = _$rwProx(foo_rewire, "foo", () => foo, val => foo = val);

const bar_rewire = 2;

let bar = _$rwProx(bar_rewire, "bar", () => bar, val => bar = val);

const baz_rewire = 3;

let baz = _$rwProx(baz_rewire, "baz", () => baz, val => baz = val);

const boop_rewire = 0;

let boop = _$rwProx(boop_rewire, "boop", () => boop, val => boop = val);

const derp_rewire = 1;

let derp = _$rwProx(derp_rewire, "derp", () => derp, val => derp = val);

export { foo, bar, baz, boop, derp };