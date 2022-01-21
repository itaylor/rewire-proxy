import assert from 'assert';
import { doAllTheThings, biffIt, __RewireAPI__ } from './fixtures/import/usesFakeLibrary.js';
import { FakeClass, __RewireAPI__ as FakeClassRewire } from './fixtures/import/FakeClass.js';

describe('Mock imports and classes', () => {
  
  afterEach(() => __RewireAPI__.restoreAll());

  it('should allow to override imports of rewired module', () => {
    const preRewired = doAllTheThings();
    assert.strictEqual(preRewired, 'fooFn, foo, bar, barFn');
    const { rewire, restore } = __RewireAPI__;
    
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

  it('should allow to mock a class constructor', () => {
    const { rewire, restore } = FakeClassRewire;

    const fc = new FakeClass();
    assert.strictEqual(fc.doesSomethingLame(), false);
    rewire('FakeClass', (class OverridesFakeClass {
      constructor () {
        this.awesome = true;
      }
      doesSomethingLame() {
        return 'lame';
      }
    }));
    const fc2 = new FakeClass();
    assert.strictEqual(fc2.doesSomethingLame(), 'lame');
    const fc3 = new FakeClass();
    assert.strictEqual(fc3.doesSomethingLame(), 'lame');
    restore('FakeClass');
    const fc4 = new FakeClass();
    assert.strictEqual(fc4.doesSomethingLame(), false);
  });

  it('should allow to mock a class constructor with super', () => {
    const { rewire, restore } = FakeClassRewire;

    const fc = new FakeClass();
    assert.strictEqual(fc.doesSomethingLame(), false);
    rewire('FakeClass', (class OverridesFakeClass extends FakeClass {
      constructor() {
        super();
        this.awesome = true;
      }
    }));
    const fc2 = new FakeClass();
    assert.strictEqual(fc2.doesSomethingLame(), true);
    const fc3 = new FakeClass();
    assert.strictEqual(fc3.doesSomethingLame(), true);
    restore('FakeClass');
    const fc4 = new FakeClass();
    assert.strictEqual(fc4.doesSomethingLame(), false);
  });

});