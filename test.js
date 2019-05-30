/* eslint-env mocha */

'use strict';

const assert = require('assert');
const argv = require('.');

describe('argv', function () {

  it('It should return an object.', function () {
    const result = argv([]);
    assert(typeof result === 'object');
  });

  it('It should return the specified result.', function () {
    const result = argv(['--foo', 'bar']);
    assert.deepStrictEqual(result, { _: [], foo: 'bar' });
  });

  it('It should support falsy `options.first`.', function () {
    const result = argv(['example1', 'example2'], { first: false });
    assert.deepStrictEqual(result, { _: 'example2' });
  });

  it('It should support multi values.', function () {
    const result = argv(['example', '--list', 'a', '--list', 'b'], { multi: true });
    assert.deepStrictEqual(result, { _: ['example'], list: ['a', 'b'] });
  });

  it('It should support `--` flag.', function () {
    const result = argv(['--', '--sort']);
    assert(Object.prototype.hasOwnProperty.call(result, '$'));
    assert.deepStrictEqual(result.$, { _: [], sort: true });
  });

  it('It should support `options._`', function () {
    const result = argv(['underline', '--_', 'abc'], { _: true });
    assert.deepStrictEqual(result, { _: ['underline'], argv: { _: 'abc' } });
  });

  it('It should support hyphen', function () {
    const result = argv(['--foo-bar', 'abc']);
    assert.deepStrictEqual(result, { _: [], fooBar: 'abc' });
  });

  it('It should support `--no-` flag', function () {
    const result = argv(['--no-sort', '--desc', '--no-result', 'none']);
    assert.deepStrictEqual(result, { _: [], sort: false, desc: true, noResult: 'none' });
  });

  it('It should support `options.alias`', function () {
    const result = argv(['-s', 'foo', '--other', 'bar'], { alias: { s: 'selection' } });
    assert.deepStrictEqual(result, { _: [], selection: 'foo', other: 'bar' });
  });

  it('It should support `options.number`', function () {
    const result = argv(['--max', '5'], { number: true });
    assert.deepStrictEqual(result, { _: [], max: 5 });
  });

});
