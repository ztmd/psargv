'use strict';

function psargv(args, options = {}) {

  if (!Array.isArray(args)) {
    throw new Error('`args` must be an array');
  }

  const result = {};

  const {
    first = true,
    number = true,
    multi
  } = options;

  if (first) {
    result._ = [];
  }

  if (options._) {
    result.argv = {};
  }

  while (args.length) {
    const arg = args.shift();

    if (!arg) {
      continue;
    }

    if (arg[0] !== '-') {
      if (first) {
        result._.push(arg);
      } else {
        result._ = arg;
      }
    } else if (arg === '--') {
      // extra args
      result.$ = psargv(args, options);
      break;
    } else if (arg[0] === '-') {
      if (arg.indexOf('=') > 0) {
        // ignore trailing '='
        if (arg[arg.length - 1] === '=') {
          continue;
        }
        // --key=value
        const [key, ...values] = arg.split('=');
        set(key, values.join('='));
      } else if (args[0] && args[0][0] !== '-') {
        // --key value
        set(arg, args.shift());
      } else {
        // --key
        set(arg, true);
      }
    }
  }

  return result;

  function set(key, value) {
    if (key[1] === '-') {
      let name = key.replace(/^-+/, '');
      if (value === true && /^no-[^-]/.test(name)) {
        name = name.substr(3);
        value = false;
      }
      name = name.replace(/-+(\w)/g, (_, a) => a.toUpperCase());
      _set(name, value);
    } else {
      key.slice(1).split('').forEach(k => {
        const alias = options.alias && options.alias[k];
        if (alias) {
          _set(alias, value);
        }
        if (!alias || options.keepAlias) {
          _set(k, value);
        }
      });
    }
  }

  function _set(key, value) {

    if (
      !options.unsafe
      && ['prototype', 'constructor', '__proto__'].includes(key)
    ) {
      return;
    }

    const dest = options._ ? result.argv : result;
    if (number && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(value)) {
      value = +value;
    }

    if (
      multi === true
      || (Array.isArray(multi) && multi.includes(key))
    ) {
      if (dest[key]) {
        dest[key].push(value);
      } else {
        dest[key] = [value];
      }
    } else if (multi === false) {
      dest[key] = value;
    } else if (dest[key]) {
      if (Array.isArray(dest[key])) {
        dest[key].push(value);
      } else {
        dest[key] = [dest[key], value];
      }
    } else {
      dest[key] = value;
    }
  }
}

psargv.argv = psargv(process.argv.slice(2));

module.exports = psargv;
