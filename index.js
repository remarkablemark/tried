var add = require('./lib/add');
var constants = require('./lib/constants');
var contains = require('./lib/contains');
var get = require('./lib/get');
var utilities = require('./lib/utilities');

var END_KEY = constants.END_KEY;
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
      add(strings[i], trie);
    }
  } else {
    add(strings, trie);
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
