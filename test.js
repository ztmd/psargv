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
    const result = psargv(['example', '--list', 'a', '--list', 'b']);
    assert.deepStrictEqual(result, { _: ['example'], list: ['a', 'b'] });
  });

  it('It should support `options.multi=true`', function () {
    const result = psargv(['example', '--list', 'a', '--name', 'b'], { multi: true });
    assert.deepStrictEqual(result, { _: ['example'], list: ['a'], name: ['b'] });
  });

  it('It should support `options.multi=false`', function () {
    const result = psargv(['example', '--list', 'a', '--list', 'b'], { multi: false });
    assert.deepStrictEqual(result, { _: ['example'], list: 'b' });
  });

  it('It should support `options.multi` to be an array.', function () {
    const result = psargv(['example', '--type', 'a', '--type', 'b'], {
      multi: ['type']
    });
    assert.deepStrictEqual(result, { _: ['example'], type: ['a', 'b'] });
  });

  it('It should support `--` flag.', function () {
    const result = psargv(['--', '--sort']);
    assert(Object.prototype.hasOwnProperty.call(result, '$'));
    assert.deepStrictEqual(result.$, { _: [], sort: true });
  });

  it('It should support `options._`.', function () {
    const result = psargv(['underline', '--_', 'abc'], { _: true });
    assert.deepStrictEqual(result, { _: ['underline'], argv: { _: 'abc' } });
  });

  it('It should support hyphen.', function () {
    const result = psargv(['--foo-bar', 'abc']);
    assert.deepStrictEqual(result, { _: [], fooBar: 'abc' });
  });

  it('It should support `--no-` flag.', function () {
    const result = psargv(['--no-sort', '--desc', '--no-result', 'none']);
    assert.deepStrictEqual(result, { _: [], sort: false, desc: true, noResult: 'none' });
  });

  it('It should support `options.alias`.', function () {
    const result = psargv(['-s', 'foo', '--other', 'bar'], { alias: { s: 'selection' } });
    assert.deepStrictEqual(result, { _: [], selection: 'foo', other: 'bar' });
  });

  it('It should support number.', function () {
    const result = psargv(['--max', '5'], { number: true });
    assert.deepStrictEqual(result, { _: [], max: 5 });
  });

  it('It should support falsy `options.number`.', function () {
    const result = psargv(['--init', '75'], { number: false });
    assert.deepStrictEqual(result, { _: [], init: '75' });
  });

  it('It should avoid potential prototype pollution.', function () {
    const result = psargv(['--prototype', 'xxx', '--constructor', 'yyy']);
    assert.deepStrictEqual(result, { _: [] });
  });

});
