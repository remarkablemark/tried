const assert = require('assert');
const tried = require('..');

const KEY = '$$'; // end of word key
const VALUE = 1; // end of word value

describe('tried', () => {
  [undefined, null, 0, 1, 'string'].forEach(arg => {
    it(`returns {} when arguments=[${arg}]`, () => {
      assert.deepEqual(tried(arg), {});
    });
  });

  [{}, [], () => {}, new Date()].forEach(arg => {
    it(`returns {} when arguments=[${arg.constructor.name}]`, () => {
      assert.deepEqual(tried(arg), {});
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
    it(`returns ${JSON.stringify(expected)}`, () => {
      assert.deepEqual(tried(args), expected);
    });
  });
});
