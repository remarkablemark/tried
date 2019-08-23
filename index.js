var Trie = require('./lib/trie');

/**
 * Instantiates a trie.
 *
 * @param {String[]|String} [strings]
 * @return {Trie}
 */
function tried(strings) {
  return new Trie(strings);
}

module.exports = tried;
