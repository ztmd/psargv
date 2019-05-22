/* eslint-env mocha */

'use strict';

const assert = require('assert');
const argv = require('.');

describe('@ztmd/argv', function () {

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

});
