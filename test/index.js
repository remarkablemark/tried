const assert = require('assert');
const main = require('..');

describe('tried', () => {
  it('returns with placeholder', () => {
    assert.equal(main(), 'tried');
  });
});
