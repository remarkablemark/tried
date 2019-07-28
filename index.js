/**
 * The end of word flag or marker.
 *
 * The key being a string with a length of 2 helps ensure uniqueness.
 * The value being a number helps differentiate against a string, keeps the data size small, and holds a truthy value.
 */
var END_OF_WORD_KEY = '$$';
var END_OF_WORD_VALUE = 1;

/**
 * Represents a trie.
 *
 * @constructor
 * @param {Array} [strings]
 */
function Trie(strings) {
  addToTrie(strings, (this.data = {}));
}

/**
 * Checks if trie contains string.
 *
 * @param {String} string
 * @return {Boolean}
 */
Trie.prototype.contains = function(string) {
  if (!string || typeof string !== 'string') {
    return false;
  }

  var letters = string.split('');
  var node = this.data;

  for (var i = 0, len = letters.length, lastIndex = len - 1; i < len; i++) {
    var key = letters[i];
    if (!node.hasOwnProperty(key)) {
      return false;
    }

    node = node[key];
    if (lastIndex === i) {
      return node.hasOwnProperty(END_OF_WORD_KEY);
    }
  }
};

/**
 * Gets value of string in trie.
 *
 * @param {String} string
 * @return {*}
 */
Trie.prototype.get = function(string) {
  if (!string || typeof string !== 'string') {
    return;
  }

  var letters = string.split('');
  var node = this.data;

  for (var i = 0, len = letters.length, lastIndex = len - 1; i < len; i++) {
    var key = letters[i];
    if (!node.hasOwnProperty(key)) {
      return;
    }

    node = node[key];
    if (lastIndex === i && node.hasOwnProperty(END_OF_WORD_KEY)) {
      return node[END_OF_WORD_KEY];
    }
  }
};

/**
 * Adds words to trie by object mutation.
 *
 * @param {Array} strings
 * @param {Object} trie
 */
function addToTrie(strings, trie) {
  if (!(strings instanceof Array) || !strings.length) {
    return;
  }

  var root = trie; // initial node (level 0)

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
}

/**
 * Creates a trie.
 *
 * @param {Array} [strings]
 * @return {Object}
 */
function tried(strings) {
  return new Trie(strings);
}

module.exports = tried;
