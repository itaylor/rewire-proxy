import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime.js';

const _$rwRuntime = _rewireProxyRuntime();

const _$rwProx = _$rwRuntime._add;
export { _$rwRuntime as __RewireAPI__ };

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