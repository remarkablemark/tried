var constants = require('./constants');
var utilities = require('./utilities');

var END_KEY = constants.END_KEY;
var isObjectEmpty = utilities.isObjectEmpty;

/**
 * Removes string from trie.
 *
 * @param {String} string
 * @param {Object} trie
 */
function remove(string, trie) {
  if (!string || typeof string !== 'string') {
    return;
  }

  var letters = string.split('');
  var node = trie;
  var nodes = [node];

  for (var i = 0, len = letters.length, lastIndex = len - 1; i < len; i++) {
    var key = letters[i];
    if (!node.hasOwnProperty(key)) {
      return;
    }

    node = node[key];
    if (lastIndex === i && node.hasOwnProperty(END_KEY)) {
      delete node[END_KEY];

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
