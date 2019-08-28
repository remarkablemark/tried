var constants = require('./constants');
var END_KEY = constants.END_KEY;

/**
 * Checks if trie contains a string.
 *
 * @param {string} string
 * @param {Object} trie
 * @return {boolean}
 */
function contains(string, trie) {
  if (!string || typeof string !== 'string') {
    return false;
  }

  var letters = string.split('');
  var node = trie;

  for (var i = 0, len = letters.length, lastIndex = len - 1; i < len; i++) {
    var key = letters[i];
    if (!node.hasOwnProperty(key)) {
      return false;
    }

    node = node[key];
    if (lastIndex === i) {
      return node.hasOwnProperty(END_KEY);
    }
  }
}

module.exports = contains;
