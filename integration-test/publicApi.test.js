import assert from 'assert';
import { doAllTheThings, __RewireAPI__ } from './fixtures/import/usesFakeLibrary.js';

describe('Public API contract', () => {
  before(() => {
    __RewireAPI__.restoreAll();
  });

  it('should expose `rewire` and `restore` functions on __RewireAPI__ export', () => {
    const preRewired = doAllTheThings();
    assert.strictEqual(preRewired, 'fooFn, foo, bar, barFn');
    let didApply = false;
    const { rewire, restore } = __RewireAPI__;

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
  });

  it('should allow to restore with the return value of `rewire`', () => {
    let didApply = false;
    const { rewire } = __RewireAPI__;
    const revert = rewire('fakeLibrary', () => {
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

  it('should expose the `grab` function that can grab non exported variables', () => {
    const { grab } = __RewireAPI__;
    const yepStr = grab('yepVar');
    assert.strictEqual(yepStr, 'yep');
  });

  it('should allow changing const values with rewire', () => {
    const { rewire, grab } = __RewireAPI__; 
    const restore = rewire('yepVar', 'nope');
    const yepStr = grab('yepVar');
    assert.strictEqual(yepStr, 'nope');
    restore();
    const yepStr2 = grab('yepVar');
    assert.strictEqual(yepStr2, 'yep');
  });

  it('`restoreAll` function', () => {
    const preRewired = doAllTheThings();
    assert.strictEqual(preRewired, 'fooFn, foo, bar, barFn');
    const { rewire, restoreAll } = __RewireAPI__;
    let didApply = false;
    rewire('fakeLibrary', () => {
      didApply = true;
      return 'overriddenFooFn';
    });
    const postRewired = doAllTheThings();
    assert.ok(didApply);
    assert.strictEqual(postRewired, 'overriddenFooFn, foo, bar, barFn');
    restoreAll();
    const postRestored = doAllTheThings();
    assert.strictEqual(postRestored, 'fooFn, foo, bar, barFn');
  });
});