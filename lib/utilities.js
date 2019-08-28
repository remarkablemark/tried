var assign = Object.assign;

if (typeof assign !== 'function') {
  /**
   * Polyfills `Object.assign`.
   *
   * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign}
   *
   * @param {Object} target
   * @param {...Object} [source]
   * @return {Object}
   */
  assign = function(target, source) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
      if (i !== 1) {
        source = arguments[i];
      }
      if (source instanceof Object) {
        for (var key in source) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
}

/**
 * Invokes function with arguments and data.
 *
 * @param {Function} func
 * @param {Array} args
 * @param {Object} data
 */
function invoke(func, args, data) {
  var argsLen = args.length;
  if (argsLen) {
    for (var i = 0; i < argsLen; i++) {
      func(args[i], data);
    }
  }
}

/**
 * Checks if object is empty.
 *
 * @param {Object} object
 * @return {boolean}
 */
function isObjectEmpty(object) {
  for (var key in object) {
    /* istanbul ignore else */
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

module.exports = {
  assign: assign,
  invoke: invoke,
  isObjectEmpty: isObjectEmpty
};
