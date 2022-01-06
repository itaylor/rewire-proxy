import assert from 'assert';
import { doAllTheThings, biffIt, __RewireAPI__ } from './fixtures/import/usesFakeLibrary.js';

describe('Mock imports', () => {
  it('should allow to override imports of rewired module', () => {
    const preRewired = doAllTheThings();
    assert.strictEqual(preRewired, 'fooFn, foo, bar, barFn');
    const rewire = __RewireAPI__.__Rewire__;
    const restore = __RewireAPI__.__ResetDependency__;

    // `fakeLibrary` is a function imported into `usesFakeLibrary`.
    // change `usesFakeLibrary` to use a different value for `fakeLibrary`. 
    let didApply = false;
    rewire('fakeLibrary', () => {
      didApply = true;
      return 'overriddenFooFn';
    });
    const postRewired = doAllTheThings();
    assert.ok(didApply);
    assert.strictEqual(postRewired, 'overriddenFooFn, foo, bar, barFn');
   
    restore('fakeLibrary');
   
    const postRestored = doAllTheThings();
    assert.strictEqual(postRestored, 'fooFn, foo, bar, barFn');

    rewire('bar', {
      sayBar: () => 'hello'
    });
    
    const remodified = doAllTheThings();
    assert.strictEqual(remodified, 'fooFn, foo, hello, barFn');
        
    // `biff` is imported in `usesFakeLibrary` and is used in the function biffIt
    // Reach in to useFakeLibrary and change the imported biff constant.
    assert.strictEqual(biffIt(), 7);
    rewire('biff', 42);
    assert.strictEqual(biffIt(), 42);
    restore('biff');
    assert.strictEqual(biffIt(), 7);
    rewire('biff', 420);
    assert.strictEqual(biffIt(), 420);
    restore('biff');
    assert.strictEqual(biffIt(), 7);
  });
});