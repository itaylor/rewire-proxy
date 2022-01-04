import assert from 'assert';
import { doAllTheThings, biffIt, rewire$fakeLibrary, rewire$bar, rewire$biff, restore } from './fixtures/import/usesFakeLibrary.js';

describe('Mock imports', () => {
  it('should allow to override imports of rewired module', () => {
    const preRewired = doAllTheThings();
    assert.strictEqual(preRewired, 'fooFn, foo, bar, barFn');
    let didApply = false;
    rewire$fakeLibrary({ apply: (target, thisArg, argumentsList) => {
      assert.strictEqual(typeof target, 'function');
      assert.strictEqual(target(), 'fooFn');
      assert.equal(argumentsList.length, 0);
      didApply = true;
      return 'overriddenFooFn';
    }});
    const postRewired = doAllTheThings();
    assert.ok(didApply);
    assert.strictEqual(postRewired, 'overriddenFooFn, foo, bar, barFn');

    restore();
    const postRestored = doAllTheThings();
    assert.strictEqual(postRestored, 'fooFn, foo, bar, barFn');

    rewire$bar({
      get: (target, prop, receiver) => {
        if (prop === 'sayBar') {
          return () => 'hello';
        }
        return Reflect.get(target, prop, receiver);
      }
    });
    const remodified = doAllTheThings();
    assert.strictEqual(remodified, 'fooFn, foo, hello, barFn');
        
    assert.strictEqual(biffIt(), 7);
    rewire$biff(42);
    assert.strictEqual(biffIt(), 42);
    restore();
    assert.strictEqual(biffIt(), 7);
    rewire$biff(420);
    assert.strictEqual(biffIt(), 420);
  });
});