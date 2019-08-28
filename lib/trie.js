var add = require('./add');
var constants = require('./constants');
var contains = require('./contains');
var get = require('./get');
var remove = require('./remove');
var utilities = require('./utilities');

var assign = utilities.assign;
var invoke = utilities.invoke;

/**
 * Constructs a trie.
 *
 * @constructor
 * @param {Object} [options]
 * @param {string} [options.endKey='$$']
 * @param {number} [options.endValue=1]
 */
function Trie(options) {
  this.options = assign(
    {
      endKey: constants.END_KEY,
      endValue: constants.END_VALUE
    },
    options
  );
  this.data = {};
}

/**
 * Adds string(s) to trie.
 *
 * @param {...string}
 * @return {this}
 */
Trie.prototype.add = function() {
  invoke(add, arguments, this.data, this.options);
  return this;
};

/**
 * Checks if trie contains a string.
 *
 * @param {string} string
 * @return {boolean}
 */
Trie.prototype.contains = function(string) {
  return contains(string, this.data, this.options);
};

/**
 * Gets end of string value from trie.
 *
 * @param {string} string
 * @return {*}
 */
Trie.prototype.get = function(string) {
  return get(string, this.data, this.options);
};

/**
 * Removes string(s) from trie.
 *
 * @param {...string}
 * @return {this}
 */
Trie.prototype.remove = function() {
  invoke(remove, arguments, this.data, this.options);
  return this;
};

module.exports = Trie;
