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

## Options

### first

- type: `boolean`
- default: **true**

First arguments

Name|Type|Default|Note
----|----|-------|----
first|`boolean`|**true**|
mulit|`boolean`/`array`|

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
