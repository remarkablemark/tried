/**
 * If argument is an array, iterate through values and invoke function with value.
 * If argument is not an array, invoke function with argument.
 *
 * @param {Function} func
 * @param {*} array
 */
function invoke(func, array) {
  var restArgs = Array.prototype.slice.call(arguments, 2);
  if (!(array instanceof Array)) {
    array = [array];
  }
  for (var i = 0, len = array.length; i < len; i++) {
    func.apply(null, [array[i]].concat(restArgs));
  }
}

/**
 * Checks if object is empty.
 *
 * @param {Object} object
 * @return {Boolean}
 */
function isObjectEmpty(object) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

module.exports = {
  invoke: invoke,
  isObjectEmpty: isObjectEmpty
};
