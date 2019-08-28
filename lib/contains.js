/**
 * Checks if trie contains a string.
 *
 * @param {string} string
 * @param {Object} trie
 * @param {Object} options
 * @param {string} options.endKey
 * @return {boolean}
 */
function contains(string, trie, options) {
  if (!string || typeof string !== 'string') {
    return false;
  }

  var endKey = options.endKey;
  var letters = string.split('');
  var node = trie;

  for (var i = 0, len = letters.length, lastIndex = len - 1; i < len; i++) {
    var key = letters[i];
    if (!node.hasOwnProperty(key)) {
      return false;
    }

    node = node[key];
    if (lastIndex === i) {
      return node.hasOwnProperty(endKey);
    }
  }
}

module.exports = contains;
