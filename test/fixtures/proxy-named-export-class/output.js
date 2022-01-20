import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

import { foo as foo_rewire } from "../../import/fakeLibrary";

var foo = _$rwProx(foo_rewire, "foo", () => foo, val => foo = val);

class Foob {
  someMethod() {
    return 'cool';
  }

}

Foob = _$rwProx(Foob, "Foob", () => Foob, val => Foob = val);
Foob.staticProp = {
  nice: 'test'
};

class Bar {
  doThing() {
    return 0;
  }

}

Bar = _$rwProx(Bar, "Bar", () => Bar, val => Bar = val);
export { Foob, Bar, _$rwRuntime as __RewireAPI__ };