import fakeLibrary, { foo, bar, barFn, biff } from './fakeLibrary.js';


export function doAllTheThings() {

  // I should return a string 
  // 'fooFn, foo, bar, barFn'
  return `${fakeLibrary()}, ${foo()}, ${bar.sayBar()}, ${barFn()}`;
}

export function biffIt() {
  return biff;
}