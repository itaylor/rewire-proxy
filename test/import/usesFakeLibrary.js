import fakeLibrary, { foo, bar, barFn } from './fakeLibrary.js';


export function doAllTheThings() {

  // I should return a string 
  // 'fooFn, foo, bar, barFn'
  return `${fakeLibrary()}, ${foo}, ${bar}, ${barFn()}`;
}