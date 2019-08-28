/**
 * Invokes function with arguments and data.
 *
 * @param {Function} func
 * @param {Array} args
 * @param {Object} data
 */
function invokeArgs(func, args, data) {
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
  invokeArgs: invokeArgs,
  isObjectEmpty: isObjectEmpty
};
