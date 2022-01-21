import assert from 'assert';
import { useStuff, useDateGetTime, useMapGet, useSetHas, useRegExpTest, useWeakMapGet, __RewireAPI__ as builtInTypesRewire }from './fixtures/builtInTypes.js';

describe('Built in types', () => {
  // Many JS built-in types use "internal slots" that ES6 Proxies can't deal with without adding some wrapping with .bind in the `get` trap
  // See: https://stackoverflow.com/a/57958494  
  it('should be safe to use built in types that have been proxied without them blowing up', () => {
    assert(useStuff());
  });

  it('should be possible to mock functions on built-in types', () => {
    const triple12 = new Date('12/12/2012').getTime();
    const arr = [useDateGetTime, useMapGet, useSetHas, useRegExpTest, useWeakMapGet];
    const origVals = arr.map(f => f());
    
    const rewire = builtInTypesRewire.__Rewire__;
    const restore = builtInTypesRewire.__ResetDependency__;
    
    rewire('dateObj', {
      getTime:() => {
        return new Date('12/12/2012').getTime();
      }
    });
    rewire('mapObj', {
      get: () => 'bonus'
    });
    rewire('setObj', {
      has: () => true
    });
    rewire('regExp', {
      test: () => false
    });
    rewire('weakMap', {
      get: () => 'awesome'
    });
    const newVals = arr.map(f => f());

    arr.forEach((v, i) => {
      assert(v !== newVals[i]);
    });
    assert.deepStrictEqual(newVals, [triple12, 'bonus', true, false, 'awesome']);

    restore('dateObj');
    restore('mapObj');
    restore('setObj');
    restore('regExp');
    restore('weakMap');

    const restoredVals = arr.map(f => f());
    assert.deepStrictEqual(restoredVals, origVals);
  });
});