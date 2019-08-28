/**
 * Adds string to trie (via object mutation).
 *
 * @param {string|Object} string
 * @param {Object} trie
 * @param {Object} options
 * @param {string} options.endKey
 * @param {*} options.endValue
 * @param {*} [endValue]
 */
function add(string, trie, options, endValue) {
  if (string instanceof Object) {
    for (var key in string) {
      add(key, trie, options, string[key]);
    }
    return;
  }

  if (!string || typeof string !== 'string') {
    return;
  }

  var endKey = options.endKey;
  endValue = arguments.length === 4 ? endValue : options.endValue;

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
      node[endKey] = endValue;
    }
  }
}

module.exports = add;
