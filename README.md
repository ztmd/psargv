# psargv

Opinionated argument parser for node.js CLI.

## Install

```bash
npm install psargv
```

```bash
yarn add psargv
```

## Usage

```js
const psargv = require('psargv');
psargv(args, options);
```

Node CLI arguments is automatically parsed as `argv` of `psargv`, i.e., if you are using a node CLI application, try:

```js
const argv = require('psargv').argv;
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

Note that multi values is generated by default if the key is already existed.

### number

- type: `boolean`
- default: **true**

Auto parse number value if the value is specified like a JSON number.

### _

- type: `boolean`

Support using underline `_` as the `key`.

### alias

- type: object

Define alias map. If it is specified to `{s: 'sort'}`, while parsing `s`, use `sort` instead.

### keepAlias

- type: `boolean`
- default: `false`

Keep the abbreviation key.

Only available when `alias` is triggered.

### unsafe

- type: `boolean`
- default: `false`

To avoid potential prototype pollution, three keys: `prototype`, `constructor`, `__proto__` are ignored by default, set `unsafe` to `true` to use them if needed.

## Example

### Scripts

```js
psargv(['--foo', 'bar']);
// > { _: [], foo: 'bar' }

psargv(['example', '--list', 'a', '--list', 'b']);
// > { _: [ 'example' ], list: [ 'a', 'b' ] }
```

### CLI

```js
// demo.js
const psargv = require('psargv');

console.log(psargv(process.argv.slice(2), { multi: ['test'] }));
```

```bash
$ node demo.js hello --test world
```
```
> { _: [ 'hello' ], test: [ 'world' ] }
```

## License

MIT.
