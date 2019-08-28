const assert = require('assert');
const { isObjectEmpty } = require('../lib/utilities');

describe('utilities', () => {
  describe('isObjectEmpty', () => {
    it('returns false when object has property', () => {
      assert.strictEqual(isObjectEmpty({ a: 1 }), false);
    });

    it('returns true when object is empty', () => {
      assert.strictEqual(isObjectEmpty({}), true);
    });
  });
});
