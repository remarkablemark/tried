var add = require('./lib/add');
var contains = require('./lib/contains');
var get = require('./lib/get');
var remove = require('./lib/remove');

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
      remove(strings[i], trie);
    }
  } else {
    remove(strings, trie);
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
