/**
 * The default end of string marker and value.
 *
 * The key `$$` ensures uniqueness since it has a length of 2.
 * The value `1` is a boolean integer of 1 byte.
 */
module.exports = {
  END_KEY: '$$',
  END_VALUE: 1
};
