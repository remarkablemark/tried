const assert = require('assert');
let utilities = require('../lib/utilities');

describe('utilities', () => {
  describe('assign', () => {
    it('is equivalent to Object.assign', () => {
      assert.strictEqual(utilities.assign, Object.assign);
    });

    describe('when Object.assign=undefined', () => {
      const { assign } = Object;

      before(() => {
        delete require.cache[require.resolve('../lib/utilities')];
        delete Object.assign;
        utilities = require('../lib/utilities');
      });

      after(() => {
        Object.assign = assign;
        delete require.cache[require.resolve('../lib/utilities')];
        utilities = require('../lib/utilities');
      });

      it('throws error if first argument is undefined or null', () => {
        [undefined, null].forEach(arg => {
          assert.throws(() => {
            utilities.assign(arg);
          }, new TypeError('Cannot convert undefined or null to object'));
        });
      });

      it('copies properties from source object to target object', () => {
        const target = { a: 1, b: 2 };
        const source = { b: 4, c: 5 };
        const expected = { a: 1, b: 4, c: 5 };
        assert.deepEqual(utilities.assign(target, source), expected);
      });

      it('copies properties from source objects to target object', () => {
        const target = {};
        const source1 = { a: null, b: 'foo' };
        const source2 = { b: undefined, c: 0 };
        const expected = { a: null, b: undefined, c: 0 };
        assert.deepEqual(utilities.assign(target, source1, source2), expected);

        // only target object should be mutated
        assert.deepEqual(target, expected);
        assert.deepEqual(source1, { a: null, b: 'foo' });
        assert.deepEqual(source2, { b: undefined, c: 0 });
      });
    });
  });

  describe('isObjectEmpty', () => {
    it('returns false when object has property', () => {
      assert.strictEqual(utilities.isObjectEmpty({ a: 1 }), false);
    });

    it('returns true when object is empty', () => {
      assert.strictEqual(utilities.isObjectEmpty({}), true);
    });
  });
});
