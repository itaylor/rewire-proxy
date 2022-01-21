// Many JS built-in types use "internal slots" that ES6 Proxies can't deal with without adding some wrapping with .bind in the `get` 
// See: https://stackoverflow.com/a/57958494
const dateObj = new Date('01/01/2020');
const mapObj = new Map();
const setObj = new Set();
const regExp = new RegExp('.*');
const weakMap = new WeakMap();


export function useDateGetTime() {
  return dateObj.getTime();
}

export function useMapGet() {
  return mapObj.get('foo');
}

export function useSetHas() {
  return setObj.has('biff');
}

export function useRegExpTest() {
  return regExp.test('anything');
}

export function useWeakMapGet() {
  return weakMap.get(mapObj);
}

export function useStuff() {
  useDateGetTime();
  useMapGet();
  useSetHas();
  useRegExpTest();
  useWeakMapGet();
  return true;
}
