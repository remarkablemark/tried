const assert = require('assert');
const tried = require('..');

describe('tried', () => {
  [undefined, []].forEach(arg => {
    describe(`when arguments=[${JSON.stringify(arg)}]`, () => {
      it('returns {}', () => {
        assert.deepEqual(tried(arg), {});
      });
    });
  });
});
