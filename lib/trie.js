var add = require('./add');
var contains = require('./contains');
var get = require('./get');
var remove = require('./remove');
var utilities = require('./utilities');

var invoke = utilities.invoke;

/**
 * Constructs a trie.
 *
 * @constructor
 * @param {...string}
 */
function Trie() {
  this.data = {};
  invoke(add, arguments, this.data);
}

/**
 * Adds string(s) to trie.
 *
 * @param {...string}
 * @return {this}
 */
Trie.prototype.add = function() {
  invoke(add, arguments, this.data);
  return this;
};

/**
 * Checks if trie contains a string.
 *
 * @param {string} string
 * @return {boolean}
 */
Trie.prototype.contains = function(string) {
  return contains(string, this.data);
};

/**
 * Gets end of string value from trie.
 *
 * @param {string} string
 * @return {*}
 */
Trie.prototype.get = function(string) {
  return get(string, this.data);
};

/**
 * Removes string(s) from trie.
 *
 * @param {...string}
 * @return {this}
 */
Trie.prototype.remove = function() {
  invoke(remove, arguments, this.data);
  return this;
};

module.exports = Trie;
