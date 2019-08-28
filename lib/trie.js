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
  if (arguments.length) {
    Trie.prototype.add.apply(this, arguments);
  }
}

/**
 * Adds string(s) to trie.
 *
 * @param {...String}
 * @return {this}
 */
Trie.prototype.add = function() {
  var argLen = arguments.length;
  if (argLen) {
    for (var i = 0; i < argLen; i++) {
      add(arguments[i], this.data);
    }
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
  var argLen = arguments.length;
  if (argLen) {
    for (var i = 0; i < argLen; i++) {
      remove(arguments[i], this.data);
    }
  }
  return this;
};

module.exports = Trie;
