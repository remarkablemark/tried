var constants = require('./lib/constants');
var contains = require('./lib/contains');
var get = require('./lib/get');
var utilities = require('./lib/utilities');

var END_KEY = constants.END_KEY;
var END_VALUE = constants.END_VALUE;
var isObjectEmpty = utilities.isObjectEmpty;

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
 * Checks if trie contains a string.
 *
 * @param {String} string
 * @return {Boolean}
 */
Trie.prototype.contains = function(string) {
  return contains(string, this.data);
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
 * Gets end of string value from trie.
 *
 * @param {String} string
 * @return {*}
 */
Trie.prototype.get = function(string) {
  return get(string, this.data);
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
      node[END_KEY] = END_VALUE;
    }
  }
}

/**
 * Removes string(s) from the trie.
 *
 * @param {Array|String} [strings]
 * @return {this}
 */
Trie.prototype.remove = function(strings) {
  removeStringsFromTrie(strings, this.data);
  return this;
};

/**
 * Removes string(s) from the trie.
 *
 * @param {Array|String} [strings]
 * @param {Object} trie
 */
function removeStringsFromTrie(strings, trie) {
  if (strings instanceof Array && strings.length) {
    for (var i = 0, stringsLength = strings.length; i < stringsLength; i++) {
      removeStringFromTrie(strings[i], trie);
    }
  } else {
    removeStringFromTrie(strings, trie);
  }
}

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
    if (lastIndex === i && node.hasOwnProperty(END_KEY)) {
      delete node[END_KEY];

      // clean up empty nodes like `{ a: {} }`
      while (isObjectEmpty(node)) {
        if (nodes.length) {
          // parent node
          node = nodes.pop();
          // delete empty property
          delete node[letters[nodes.length]];
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
 * Instantiates a trie (with optional strings).
 *
 * @param {Array|String} [strings]
 * @return {Object}
 */
function tried(strings) {
  return new Trie(strings);
}

module.exports = tried;
