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
  isObjectEmpty: isObjectEmpty
};
