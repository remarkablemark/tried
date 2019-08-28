var Trie = require('./lib/trie');

/**
 * Instantiates a trie.
 *
 * @param {Object} [options]
 * @return {Trie}
 */
function tried(options) {
  return new Trie(options);
}

module.exports = tried;
