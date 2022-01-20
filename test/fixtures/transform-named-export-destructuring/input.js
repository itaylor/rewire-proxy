// object pattern
export const { funn, quux = false, quuy: quuz, ...other } = { funn: 'not fun', quuy: 'quuy', rando: 1 };

// array pattern
export const [ bunt, corge = 1, ...grault ] = ['bunt', 'corge', 'grault1', 'grault2'];

// nested object pattern
export var { a: aa = 10, b: { bb = 5 } } = { a: 3 };

// nested array pattern
export const [[ records ]] = [['records', 'tapes', 'cds']];

// object pattern with array pattern in it
export let { something: [nestedArray] } =  { something: [1,2] };

// array pattern with object pattern in it
export let [{ foo: bippy }] = [{ foo: 'test'}];