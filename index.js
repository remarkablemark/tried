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
 * @param {Array|String} [strings]
 */
function Trie(strings) {
  addStringsToTrie(strings, (this.data = {}));
}

/**
 * Checks if the trie contains a string.
 *
 * @param {String} [string]
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
 * Adds string(s) to the trie.
 *
 * @param {Array|String} [strings]
 * @return {this}
 */
Trie.prototype.add = function(strings) {
  addStringsToTrie(strings, this.data);
  return this;
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
 * Adds string(s) to the trie.
 *
 * @param {Array|String} [strings]
 * @param {Object} trie
 */
function addStringsToTrie(strings, trie) {
  if (strings instanceof Array && strings.length) {
    for (var i = 0, stringsLength = strings.length; i < stringsLength; i++) {
      addStringToTrie(strings[i], trie);
    }
  } else {
    addStringToTrie(strings, trie);
  }
}

/**
 * Adds string to trie via object mutation.
 *
 * @param {String} string
 * @param {Object} trie
 */
function addStringToTrie(string, trie) {
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
      node[END_OF_WORD_KEY] = END_OF_WORD_VALUE;
    }
  }
}

/**
 * Removes string from the trie.
 *
 * @param {String} [string]
 * @return {this}
 */
Trie.prototype.remove = function(string) {
  removeStringFromTrie(string, this.data);
  return this;
};

/**
 * Removes string from the trie.
 *
 * @param {String} string
 * @param {Object} trie
 */
function removeStringFromTrie(string, trie) {
  if (!string || typeof string !== 'string') {
    return;
  }

  var letters = string.split('');
  var node = trie;
  var nodes = [node];

  for (var i = 0, len = letters.length, lastIndex = len - 1; i < len; i++) {
    var key = letters[i];
    if (!node.hasOwnProperty(key)) {
      return;
    }

    node = node[key];
    if (lastIndex === i && node.hasOwnProperty(END_OF_WORD_KEY)) {
      delete node[END_OF_WORD_KEY];

      // clean up empty nodes like `{ a: {} }`
      while (isObjectEmpty(node)) {
        if (nodes.length) {
          // parent node
          node = nodes.pop();
          // delete empty property
          delete node[getObjectKey(node)];
        } else {
          break;
        }
      }
    }

    // keep track of traversed nodes
    nodes.push(node);
  }
}

/**
 * Gets first object key.
 *
 * @param {Object} object
 * @return {String|undefined}
 */
function getObjectKey(object) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      return key;
    }
  }
}

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

/**
 * Instantiates a trie (with optional strings).
 *
 * @param {Array|String} [strings]
 * @return {Object}
 */
function tried(strings) {
  return new Trie(strings);
}

module.exports = tried;
