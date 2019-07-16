const assert = require('assert');
const tried = require('..');

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
