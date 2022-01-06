import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime.js';
export const __RewireAPI__ = _rewireProxyRuntime();
const _$rwProx = __RewireAPI__.createProxyIfNeeded;

class Foob_rewire {
  someMethod() {
    return 'cool';
  }

}

let Foob = _$rwProx(Foob_rewire, "Foob", () => Foob, val => Foob = val);

class Bar_rewire {
  doThing() {
    return 0;
  }

}

let Bar = _$rwProx(Bar_rewire, "Bar", () => Bar, val => Bar = val);

export { Foob, Bar };