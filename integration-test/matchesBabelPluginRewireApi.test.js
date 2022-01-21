import assert from 'assert';
import { doAllTheThings, __RewireAPI__ } from './fixtures/import/usesFakeLibrary.js';

describe('Matches babel-plugin-rewire public API', () => {
  before(() => {
    globalThis.__rewire_reset_all__();
  });
  it('should expose ___Rewire___ and __ResetDependency__ functions', () => {
    const preRewired = doAllTheThings();
    assert.strictEqual(preRewired, 'fooFn, foo, bar, barFn');
    let didApply = false;
    __RewireAPI__.__Rewire__('fakeLibrary', () => {
      didApply = true;
      return 'overriddenFooFn';
    });
    
    const postRewired = doAllTheThings();
    assert.ok(didApply);
    assert.strictEqual(postRewired, 'overriddenFooFn, foo, bar, barFn');
    __RewireAPI__.__ResetDependency__('fakeLibrary');
   
    const postRestored = doAllTheThings();
    assert.strictEqual(postRestored, 'fooFn, foo, bar, barFn');
  });

  it('should expose the __set__ function, and allow to revert with the result of it', () => {
    let didApply = false;
    const revert = __RewireAPI__.__set__('fakeLibrary', () => {
      didApply = true;
      return 'overriddenFooFn';
    });
    const postRewired = doAllTheThings();
    assert.ok(didApply);
    assert.strictEqual(postRewired, 'overriddenFooFn, foo, bar, barFn');
    revert();
    const postRestored = doAllTheThings();
    assert.strictEqual(postRestored, 'fooFn, foo, bar, barFn');
  });

  it('should expose the __get__ and __GetDependency__ functions that can grab non exported variables', () => {
    const yepStr = __RewireAPI__.__get__('yepVar');
    assert.strictEqual(yepStr, 'yep');
    const yepStr2 = __RewireAPI__.__GetDependency__('yepVar');
    assert.strictEqual(yepStr2, 'yep');
  });

  it('should allow changing const values with __set__ / __rewire__', () => {
    __RewireAPI__.__set__('yepVar', 'nope');
    const yepStr = __RewireAPI__.__get__('yepVar');
    assert.strictEqual(yepStr, 'nope');
    __RewireAPI__.__Rewire__('yepVar', 'yep');
    const yepStr2 = __RewireAPI__.__GetDependency__('yepVar');
    assert.strictEqual(yepStr2, 'yep');
  });

  it('should have __rewire_reset_all__ on the globalThis object', () => {
    const preRewired = doAllTheThings();
    assert.strictEqual(preRewired, 'fooFn, foo, bar, barFn');
    let didApply = false;
    __RewireAPI__.__Rewire__('fakeLibrary', () => {
      didApply = true;
      return 'overriddenFooFn';
    });
    const postRewired = doAllTheThings();
    assert.ok(didApply);
    assert.strictEqual(postRewired, 'overriddenFooFn, foo, bar, barFn');
    globalThis.__rewire_reset_all__();
    const postRestored = doAllTheThings();
    assert.strictEqual(postRestored, 'fooFn, foo, bar, barFn');
  });
});