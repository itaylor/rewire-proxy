import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

// object pattern
var {
  funn,
  quux = false,
  quuy: quuz,
  ...other
} = {
  funn: 'not fun',
  quuy: 'quuy',
  rando: 1
}; // array pattern

funn = _$rwProx(funn, "funn", () => funn, val => funn = val);
quux = _$rwProx(quux, "quux", () => quux, val => quux = val);
quuz = _$rwProx(quuz, "quuz", () => quuz, val => quuz = val);
other = _$rwProx(other, "other", () => other, val => other = val);
var [bunt, corge = 1, ...grault] = ['bunt', 'corge', 'grault1', 'grault2']; // nested object pattern

bunt = _$rwProx(bunt, "bunt", () => bunt, val => bunt = val);
corge = _$rwProx(corge, "corge", () => corge, val => corge = val);
grault = _$rwProx(grault, "grault", () => grault, val => grault = val);
var {
  a: aa = 10,
  b: {
    bb = 5
  }
} = {
  a: 3
}; // nested array pattern

aa = _$rwProx(aa, "aa", () => aa, val => aa = val);
bb = _$rwProx(bb, "bb", () => bb, val => bb = val);
var [[records]] = [['records', 'tapes', 'cds']]; // object pattern with array pattern in it

records = _$rwProx(records, "records", () => records, val => records = val);
var {
  something: [nestedArray]
} = {
  something: [1, 2]
}; // array pattern with object pattern in it

nestedArray = _$rwProx(nestedArray, "nestedArray", () => nestedArray, val => nestedArray = val);
var [{
  foo: bippy
}] = [{
  foo: 'test'
}];
bippy = _$rwProx(bippy, "bippy", () => bippy, val => bippy = val);
export { funn, quux, quuz, other, bunt, corge, grault, aa, bb, records, nestedArray, bippy, _$rwRuntime as __RewireAPI__ };