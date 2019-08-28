var utilities = require('./utilities');
var isObjectEmpty = utilities.isObjectEmpty;

/**
 * Removes string from trie (through object mutation).
 *
 * @param {string} string
 * @param {Object} trie
 * @param {Object} options
 * @param {string} options.endKey
 */
function remove(string, trie, options) {
  if (!string || typeof string !== 'string') {
    return;
  }

  var endKey = options.endKey;
  var letters = string.split('');
  var node = trie;
  var nodes = [node];

  for (var i = 0, len = letters.length, lastIndex = len - 1; i < len; i++) {
    var key = letters[i];
    if (!node.hasOwnProperty(key)) {
      return;
    }

    node = node[key];
    if (lastIndex === i && node.hasOwnProperty(endKey)) {
      delete node[endKey];

      // clean up empty nodes like `{ a: {} }`
      while (isObjectEmpty(node)) {
        if (nodes.length) {
          // parent node
          node = nodes.pop();
          // delete empty property
          delete node[letters[nodes.length]];
        } else {
          break;
        }
      }
    }

    // keep track of traversed nodes
    nodes.push(node);
  }
}

module.exports = remove;
