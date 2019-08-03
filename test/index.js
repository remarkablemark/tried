const assert = require('assert');
const tried = require('..');
const { data, KEY, VALUE } = require('./data');

describe('tried', () => {
  it('does not set data for invalid arguments', () => {
    [undefined, null, 0, 1].forEach(arg => {
      assert.deepEqual(tried(arg).data, {});
    });

    [{}, [], () => {}, new Date()].forEach(arg => {
      assert.deepEqual(tried(arg).data, {});
    });
  });

  data.forEach(testCase => {
    const [args, expected] = testCase;

    it(`sets data for ${JSON.stringify(args)}`, () => {
      assert.deepEqual(tried(args).data, expected);
    });
  });
});

describe('contains', () => {
  it('returns false for invalid arguments', () => {
    [undefined, null, 0, 1].forEach(arg => {
      assert.strictEqual(tried().contains(arg), false);
    });

    [{}, [], () => {}, new Date()].forEach(arg => {
      assert.strictEqual(tried().contains(arg), false);
    });
  });

  [
    [['a'], 'a', true],
    [['b'], 'a', false],
    [['abc'], 'abc', true],
    [['abc'], 'ab', false],
    [['abc', 'ab'], 'ab', true],
    [['abc', 'ab'], 'abcd', false]
  ].forEach(testCase => {
    const [trieArgs, containsArgs, expected] = testCase;

    describe(`when trie contains ${JSON.stringify(trieArgs)}`, () => {
      it(`returns ${expected} for "${containsArgs}"`, () => {
        assert.strictEqual(tried(trieArgs).contains(containsArgs), expected);
      });
    });
  });
});

describe('get', () => {
  it('returns undefined for invalid arguments', () => {
    [undefined, null, 0, 1].forEach(arg => {
      assert.strictEqual(tried().get(arg), undefined);
    });

    [{}, [], () => {}, new Date()].forEach(arg => {
      assert.strictEqual(tried().get(arg), undefined);
    });
  });

  [
    [['a'], 'a', VALUE],
    [['b'], 'a', undefined],
    [['abc'], 'abc', VALUE],
    [['abc'], 'ab', undefined],
    [['abc', 'ab'], 'ab', VALUE],
    [['abc', 'ab'], 'abcd', undefined]
  ].forEach(testCase => {
    const [trieArgs, containsArgs, expected] = testCase;

    describe(`when trie contains ${JSON.stringify(trieArgs)}`, () => {
      it(`returns ${expected} for "${containsArgs}"`, () => {
        assert.strictEqual(tried(trieArgs).get(containsArgs), expected);
      });
    });
  });
});

describe('add', () => {
  // test chainable method
  it('returns instance', () => {
    const trie = tried();
    assert.equal(trie.remove(), trie);
  });

  data.forEach(testCase => {
    const [args, expected] = testCase;

    it(`adds ${JSON.stringify(args)} to trie`, () => {
      const trie = tried();
      trie.add(args);
      assert.deepEqual(trie.data, expected);
    });
  });
});

describe('remove', () => {
  // test chainable method
  it('returns instance', () => {
    const trie = tried();
    assert.equal(trie.remove(), trie);
  });

  it('removes single string from trie', () => {
    const trie = tried('a');
    trie.remove('a');
    assert.deepEqual(trie.data, {});
  });

  describe('when trie contains "a" and "ab"', () => {
    it('contains only "ab" when "a" is removed', () => {
      const trie = tried(['a', 'ab']);
      const expected = {
        a: {
          [KEY]: VALUE,
          b: {
            [KEY]: VALUE
          }
        }
      };
      assert.deepEqual(trie.data, expected);
      trie.remove('a');
      delete expected.a[KEY];
      assert.deepEqual(trie.data, expected);
    });
  });
});
