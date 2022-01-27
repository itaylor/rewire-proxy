import assert from 'assert';
import { arr, obj, __RewireAPI__ } from './fixtures/import/fakeLibrary.js';

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

  it('should support for of when rewired', () => {
    const { rewire, restore } = __RewireAPI__;
    assert.deepStrictEqual(arr, [7, 2]);
    const newArr = ['something', 'what', 'works']; 
    rewire('arr', newArr);
    let count = 0;
    for (const v of arr) {
      assert.strictEqual(v, newArr[count]);
      count++;
    }
    assert.strictEqual(count, 3);
    restore('arr');
    assert.deepStrictEqual(arr, [7, 2]);
  });

});

describe('Objects', () => {
  it('should correctly handle keys/values', () => {
    const { rewire, restore } = __RewireAPI__;
    assert.strictEqual(obj.biff, 7);
    assert.strictEqual(obj.val, 2);
    assert.deepStrictEqual(Object.keys(obj), ['biff', 'val']);
    assert.deepStrictEqual(Object.values(obj), [7, 2]);
   
    rewire('obj', {
      aDifferent: 'object',
      somethingElse: true,
      val: 1
    });
    assert.strictEqual(obj.val, 1);
    assert.deepStrictEqual(Object.keys(obj), ['aDifferent', 'somethingElse', 'val']);
    assert.deepStrictEqual(Object.values(obj), ['object', true, 1]);
   
    restore('obj');
    assert.strictEqual(obj.biff, 7);
    assert.strictEqual(obj.val, 2);
    assert.deepStrictEqual(Object.keys(obj), ['biff', 'val']);
    assert.deepStrictEqual(Object.values(obj), [7, 2]);
  });
  
  it('should handle get/set', () => {
    const { rewire, restore } = __RewireAPI__;
    rewire('obj', {
      aDifferent: 'object',
      somethingElse: true,
      val: 1
    });
    obj.val = 4;
    obj.another = 10;
    assert.strictEqual(obj.val, 4);
    assert.strictEqual(obj.another, 10);
    assert.deepStrictEqual(Object.keys(obj), ['aDifferent', 'somethingElse', 'val', 'another']);
    assert.deepStrictEqual(Object.values(obj), ['object', true, 4, 10]);
    restore('obj');
    assert.strictEqual(obj.biff, 7);
    assert.strictEqual(obj.val, 2);
    assert.deepStrictEqual(Object.keys(obj), ['biff', 'val']);
    assert.deepStrictEqual(Object.values(obj), [7, 2]);
  });
});

describe('Classes', () => {
  it('should rewire classes with other classes', () => {
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

