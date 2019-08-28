var constants = require('./constants');

var END_KEY = constants.END_KEY;
var END_VALUE = constants.END_VALUE;

/**
 * Adds string to trie (through object mutation).
 *
 * @param {string|Object} string
 * @param {Object} trie
 * @param {*} [value]
 */
function add(string, trie, value) {
  if (string instanceof Object) {
    for (var key in string) {
      add(key, trie, string[key]);
    }
    return;
  }

  if (!string || typeof string !== 'string') {
    return;
  }

  value = arguments.length === 3 ? value : END_VALUE;

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
      node[END_KEY] = arguments.length === 3 ? value : END_VALUE;
    }
  }
}

module.exports = add;
