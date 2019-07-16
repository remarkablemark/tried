/**
 * The end of word flag or marker.
 *
 * The key being a string with a length of 2 helps ensure uniqueness.
 * The value being a number helps differentiate against a string, keeps the data size small, and holds a truthy value.
 */
var END_OF_WORD_KEY = '$$';
var END_OF_WORD_VALUE = 1;

/**
 * Generates a trie data structure.
 *
 * @param  {Array}  [strings]
 * @return {Object}
 */
function tried(strings) {
  var root = {}; // initial node (level 0)

  if (!(strings instanceof Array) || !strings.length) {
    return root;
  }

  for (var i = 0, stringsLength = strings.length; i < stringsLength; i++) {
    var letters = strings[i].split('');
    var node = root;

    for (
      var j = 0,
        lettersLength = letters.length,
        lettersLastIndex = lettersLength - 1;
      j < lettersLength;
      j++
    ) {
      var letter = letters[j];

      // use node with key if it exists; otherwise, create empty node
      node[letter] = node[letter] || {};

      // update current node
      node = node[letter];

      // last node of current string (level j)
      if (lettersLastIndex === j) {
        node[END_OF_WORD_KEY] = END_OF_WORD_VALUE;
      }
    }
  }

  return root;
}

module.exports = tried;
