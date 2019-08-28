/**
 * Gets end of string value from trie.
 *
 * @param {string} string
 * @param {Object} trie
 * @param {Object} options
 * @param {string} options.endKey
 * @return {*}
 */
function get(string, trie, options) {
  if (!string || typeof string !== 'string') {
    return;
  }

  var endKey = options.endKey;
  var letters = string.split('');
  var node = trie;

  for (var i = 0, len = letters.length, lastIndex = len - 1; i < len; i++) {
    var key = letters[i];
    if (!node.hasOwnProperty(key)) {
      return;
    }

    node = node[key];
    if (lastIndex === i && node.hasOwnProperty(endKey)) {
      return node[endKey];
    }
  }
}

module.exports = get;
