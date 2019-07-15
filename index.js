/**
 * Generates a trie data structure.
 *
 * @param  {Array}  [strings]
 * @return {Object}
 */
function tried(strings) {
  if (strings === undefined) {
    return {};
  }

  if (strings instanceof Array) {
    if (!strings.length) {
      return {};
    }
  }
}

module.exports = tried;
