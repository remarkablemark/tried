var constants = require('./constants');

var END_KEY = constants.END_KEY;
var END_VALUE = constants.END_VALUE;

/**
 * Adds string to trie (mutates object).
 *
 * @param {String} string
 * @param {Object} trie
 */
function add(string, trie) {
  if (!string || typeof string !== 'string') {
    return;
  }

  var node = trie;
  var letters = string.split('');

  for (
    var i = 0,
      lettersLength = letters.length,
      lettersLastIndex = lettersLength - 1;
    i < lettersLength;
    i++
  ) {
    var letter = letters[i];

    // use node with key if it exists; otherwise, create empty node
    node[letter] = node[letter] || {};

    // update current node
    node = node[letter];

    // last node of current string
    if (lettersLastIndex === i) {
      node[END_KEY] = END_VALUE;
    }
  }
}

module.exports = add;
