var Trie = require('./lib/trie');

/**
 * Instantiates a trie.
 *
 * @param {...string}
 * @return {Trie}
 */
function tried() {
  var trie = new Trie();
  if (arguments.length) {
    trie.add.apply(trie, arguments);
  }
  return trie;
}

module.exports = tried;
