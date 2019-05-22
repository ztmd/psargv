/* eslint-env mocha */

'use strict';

const assert = require('assert');
const psargv = require('.');

describe('psargv', function () {

  it('It should return an object.', function () {
    const result = psargv([]);
    assert(typeof result === 'object');
  });

  it('It should return the specified result.', function () {
    const result = psargv(['--foo', 'bar']);
    assert.deepStrictEqual(result, { _: [], foo: 'bar' });
  });

  it('It should support falsy `options.first`.', function () {
    const result = psargv(['example1', 'example2'], { first: false });
    assert.deepStrictEqual(result, { _: 'example2' });
  });

  it('It should support multi values.', function () {
    const result = psargv(['example', '--list', 'a', '--list', 'b'], { multi: true });
    assert.deepStrictEqual(result, { _: ['example'], list: ['a', 'b'] });
  });

  it('It should support `--` flag.', function () {
    const result = psargv(['--', '--sort']);
    assert(Object.prototype.hasOwnProperty.call(result, '$'));
    assert.deepStrictEqual(result.$, { _: [], sort: true });
  });

  it('It should support `options._`', function () {
    const result = psargv(['underline', '--_', 'abc'], { _: true });
    assert.deepStrictEqual(result, { _: ['underline'], argv: { _: 'abc' } });
  });

});
