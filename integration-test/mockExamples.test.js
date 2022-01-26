import assert from 'assert';
import { arr, __RewireAPI__ } from './fixtures/import/fakeLibrary.js';

import { FakeClass, __RewireAPI__ as classRewire } from './fixtures/import/FakeClass'; 

describe('Arrays', () => {
  
  it('should rewire arrays', () => {
    const { rewire, restore } = __RewireAPI__;
    assert.deepStrictEqual(arr, [7, 2]);
    rewire('arr', ['something']);
    assert.deepStrictEqual(arr, ['something']);
    assert.equal(arr.length, 1);
    assert.strictEqual(arr[1], undefined);
    assert.deepStrictEqual(arr.map((a) => a), ['something']);
    restore('arr');
    assert.equal(arr.length, 2);
    assert.equal(arr[0], 7);
    assert.deepStrictEqual(arr, [7, 2]);
  });

  it('should support push/pop/shift/splice when rewired', () => {
    const { rewire, restore } = __RewireAPI__;
    assert.deepStrictEqual(arr, [7, 2]);
    rewire('arr', ['something']);
    assert.deepStrictEqual(arr.map((a) => a), ['something']);
    arr.push('foobar');
    arr.pop();
    arr.shift();
    arr.splice(0, 0, 'oof');
    assert.deepStrictEqual(arr, ['oof']);
    assert.strictEqual(arr.length, 1);
    restore('arr');
    assert.equal(arr.length, 2);
    assert.equal(arr[0], 7);
    assert.deepStrictEqual(arr, [7, 2]);
  });
});

describe('Classes', () => {
  it('it should rewire classes with other classes', () => {
    const { rewire } = classRewire;
    const fc = new FakeClass();
    assert.strictEqual(fc.doesSomethingLame(), false);
    class ExtraFakeClass {
      constructor() {
        this.awesome = false;
      }
      doesSomethingLame() {
        return this.awesome ? 'awesome' : 'not awesome';
      }
    }
    const reset = rewire('FakeClass', ExtraFakeClass);
    const fc2 = new FakeClass();
    assert.strictEqual(fc2.doesSomethingLame(), 'not awesome');
    reset(); 
    const fc3 = new FakeClass();
    assert.strictEqual(fc3.doesSomethingLame(), false);
  });

  it('it should rewire classes with other classes that extend original', () => {
    const { rewire } = classRewire;
    const fc = new FakeClass();
    assert.strictEqual(fc.doesSomethingLame(), false);

    class ExtraFakeClass extends FakeClass {
      doesSomethingLame() {
        return this.awesome ? 'awesome' : 'not awesome';
      }
    }
    const reset = rewire('FakeClass', ExtraFakeClass);
    const fc2 = new FakeClass();
    assert.strictEqual(fc2.doesSomethingLame(), 'not awesome');
    reset();
    const fc3 = new FakeClass();
    assert.strictEqual(fc3.doesSomethingLame(), false);
  });
});

