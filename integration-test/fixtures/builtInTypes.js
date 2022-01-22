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
