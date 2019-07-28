const KEY = '$$'; // end of word key
const VALUE = 1; // end of word value

const data = [
  /**
   *  a
   *  |
   *  .
   */
  ['a', { a: { [KEY]: VALUE } }],
  [['a'], { a: { [KEY]: VALUE } }],
  [['a', undefined], { a: { [KEY]: VALUE } }],
  [['a', null], { a: { [KEY]: VALUE } }],
  [['a', 1], { a: { [KEY]: VALUE } }],

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
];

module.exports = {
  data,
  KEY,
  VALUE
};
