import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from '@babel/core';
import { trim } from './util';
import plugin from '../src';

describe('issues', () => {
  const options = {
    babelrc: false,
    presets: ['@babel/preset-es2015'],
    plugins: [plugin]
  };

  it('#1 undefined wire', () => {
    const actual = transformFileSync('./test/issues/1/actual.js', options).code;
    const expected = fs.readFileSync('./test/issues/1/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });

  it('#5 Explicit re-export is not working', () => {
    const actual = transformFileSync('./test/issues/5/actual.js', options).code;
    const expected = fs.readFileSync('./test/issues/5/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });
});
