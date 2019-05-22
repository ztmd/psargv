# argv

Opinionated argument parser for node.js CLI.

## Install

```bash
npm install @ztmd/argv
```

```bash
yarn add @ztmd/argv
```

## Usage

```js
const argv = require('@ztmd/argv');
argv(args, options);
```

## Return

An object to representation the result.

- `result._` is specified as the first argument(s).
- `result.$` is specified as extra arguments seperated by `--` exactly.

> If you need to parse arguments which the key is `_` or `$`, set `options._` to a truthy value, and notice other values will be moved to `result.argv`.

## Options

### first

- type: `boolean`
- default: **true**

`true` to accept multi values for first arguments.

### multi

- type: `boolean`/`array`

Use multi values for the specify `key`.

While `multi` is an array, check `key` is in it or not.

### _

- type: `boolean`

Support using underline `_` as the `key`.

## Example

### Scripts

```js
argv(['--foo', 'bar']);
// > { _: [], foo: 'bar' }

argv(['example', '--list', 'a', '--list', 'b'], { multi: true });
// > { _: [ 'example' ], list: [ 'a', 'b' ] }
```

### CLI

```js
// demo.js
const argv = require('@ztmd/argv');

console.log(argv(process.argv.slice(2), { multi: ['test'] }));
```

```bash
$ node demo.js hello --test world
```
```
> { _: [ 'hello' ], test: [ 'world' ] }
```

## License

MIT.
