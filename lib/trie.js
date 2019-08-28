var add = require('./add');
var contains = require('./contains');
var get = require('./get');
var remove = require('./remove');

/**
 * Represents a trie.
 *
 * @constructor
 * @param {...String}
 */
function Trie() {
  this.data = {};
  for (var i = 0, len = arguments.length; i < len; i++) {
    add(arguments[i], this.data);
  }
}

/**
 * Adds string(s) to trie.
 *
 * @param {...String}
 * @return {this}
 */
Trie.prototype.add = function() {
  for (var i = 0, len = arguments.length; i < len; i++) {
    add(arguments[i], this.data);
  }
  return this;
};

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
 * Gets end of string value from trie.
 *
 * @param {String} string
 * @return {*}
 */
Trie.prototype.get = function(string) {
  return get(string, this.data);
};

/**
 * Removes string(s) from trie.
 *
 * @param {...String}
 * @return {this}
 */
Trie.prototype.remove = function() {
  for (var i = 0, len = arguments.length; i < len; i++) {
    remove(arguments[i], this.data);
  }
  return this;
};

module.exports = Trie;
