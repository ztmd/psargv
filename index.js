'use strict';

module.exports = function argv(args, options = {}) {

  if (!Array.isArray(args)) {
    throw new Error('`args` must be an array');
  }

  const result = {};

  const {
    first = true,
    multi
  } = options;

  if (first) {
    result._ = [];
  }

  if (options._) {
    result.argv = {};
  }

  while (args.length) {
    let arg = args.shift();

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
      result.$ = argv(args, options);
      break;
    } else if (arg[0] === '-') {
      if (arg.indexOf('=') > 0) {
        // ignore trailing '='
        if (arg[arg.length - 1] === '=') {
          continue;
        }
        // --key=value
        let [key, ...values] = arg.split('=');
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
      if (name.indexOf('no-') === 0 && name.length > 3 && value === true) {
        name = name.substr(3);
        value = false;
      }
      name = name.replace(/-(\w)/g, (_, a) => a.toUpperCase());
      _set(name, value);
    } else {
      key.slice(1).split('').forEach(k => {
        let alias = options.alias && options.alias[k];
        if (alias) {
          _set(alias, value)
        }
        if (!alias || options.keepAlias) {
          _set(k, value)
        }
      });
    }
  }

  function _set(key, value) {
    const dest = options._ ? result.argv : result;
    if (
      multi === true
      || (Array.isArray(multi) && multi.includes(key))
    ) {
      if (dest[key]) {
        dest[key].push(value);
      } else {
        dest[key] = [value];
      }
    } else {
      dest[key] = value;
    }
  }

};
