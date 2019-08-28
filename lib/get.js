var constants = require('./constants');
var END_KEY = constants.END_KEY;

/**
 * Gets end of string value from trie.
 *
 * @param {string} string
 * @param {Object} trie
 * @return {*}
 */
function get(string, trie) {
  if (!string || typeof string !== 'string') {
    return;
  }

  var letters = string.split('');
  var node = trie;

  for (var i = 0, len = letters.length, lastIndex = len - 1; i < len; i++) {
    var key = letters[i];
    if (!node.hasOwnProperty(key)) {
      return;
    }

    node = node[key];
    if (lastIndex === i && node.hasOwnProperty(END_KEY)) {
      return node[END_KEY];
    }
  }
}

module.exports = get;
