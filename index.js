var Trie = require('./lib/trie');

/**
 * Instantiates a trie.
 *
 * @param {Object} [options]
 * @param {string} [options.endKey='$$']
 * @param {number} [options.endValue=1]
 * @return {Trie}
 */
function trieste(options) {
  return new Trie(options);
}

module.exports = trieste;
