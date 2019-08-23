var add = require('./add');
var contains = require('./contains');
var get = require('./get');
var remove = require('./remove');
var utilities = require('./utilities');

var invoke = utilities.invoke;

/**
 * Represents a trie.
 *
 * @constructor
 * @param {String[]|String} [strings]
 */
function Trie(strings) {
  invoke(add, strings, (this.data = {}));
}

/**
 * Adds string(s) to trie.
 *
 * @param {String[]|String} [strings]
 * @return {this}
 */
Trie.prototype.add = function(strings) {
  invoke(add, strings, this.data);
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
 * @param {String[]|String} [strings]
 * @return {this}
 */
Trie.prototype.remove = function(strings) {
  invoke(remove, strings, this.data);
  return this;
};

module.exports = Trie;
