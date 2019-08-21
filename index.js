var add = require('./lib/add');
var contains = require('./lib/contains');
var get = require('./lib/get');
var remove = require('./lib/remove');
var utilities = require('./lib/utilities');

var invoke = utilities.invoke;

/**
 * Represents a trie.
 *
 * @constructor
 * @param {Array|String} [strings]
 */
function Trie(strings) {
  invoke(add, strings, (this.data = {}));
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
