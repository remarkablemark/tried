const assert = require('assert');
const tried = require('..');

const KEY = '$$'; // end of word key
const VALUE = 1; // end of word value

describe('data', () => {
  [undefined, null, 0, 1, 'string'].forEach(arg => {
    describe(`when arguments=[${arg}]`, () => {
      it('returns {}', () => {
        assert.deepEqual(tried(arg).data, {});
      });
    });
  });

  [{}, [], () => {}, new Date()].forEach(arg => {
    describe(`when arguments=[${arg.constructor.name}]`, () => {
      it('returns {}', () => {
        assert.deepEqual(tried(arg).data, {});
      });
    });
  });

  [
    /**
     *  a
     *  |
     *  .
     */
    [
      ['a'],
      {
        a: { [KEY]: VALUE }
      }
    ],

    /**
     *    a
     *   / \
     *  .   b
     *      |
     *      .
     */
    [
      ['a', 'ab'],
      {
        a: {
          [KEY]: VALUE,
          b: { [KEY]: VALUE }
        }
      }
    ],

    /**
     *     a
     *   / | \
     *  .  b  d
     *     |  |
     *     .  .
     */
    [
      ['a', 'ab', 'ad'],
      {
        a: {
          [KEY]: VALUE,
          b: { [KEY]: VALUE },
          d: { [KEY]: VALUE }
        }
      }
    ],

    /**
     *    a
     *    |
     *    n
     *   / \
     *  .   n
     *     / \
     *    .   a
     *        |
     *        .
     */
    [
      ['an', 'ann', 'anna'],
      {
        a: {
          n: {
            [KEY]: VALUE,
            n: {
              [KEY]: VALUE,
              a: { [KEY]: VALUE }
            }
          }
        }
      }
    ],

    /**
     *  a  b  c
     *  |  |  |
     *  .  .  .
     */
    [
      ['a', 'b', 'c'],
      {
        a: { [KEY]: VALUE },
        b: { [KEY]: VALUE },
        c: { [KEY]: VALUE }
      }
    ]
  ].forEach(testCase => {
    const [args, expected] = testCase;

    describe(`when arguments=[${JSON.stringify(args)}]`, () => {
      it(`sets data=${JSON.stringify(expected)}`, () => {
        assert.deepEqual(tried(args).data, expected);
      });
    });
  });
});

describe('contains', () => {
  [undefined, null, 0, 1].forEach(arg => {
    describe(`when arguments=[${arg}]`, () => {
      it('returns false', () => {
        assert.strictEqual(tried().contains(arg), false);
      });
    });
  });

  [{}, [], () => {}, new Date()].forEach(arg => {
    describe(`when arguments=[${arg.constructor}]`, () => {
      it('returns false', () => {
        assert.strictEqual(tried().contains(arg), false);
      });
    });
  });
});
