const assert = require('assert');
const tried = require('..');
const { END_KEY: KEY, END_VALUE: VALUE } = require('../lib/constants');
const { data, invalid } = require('./data');

describe('tried', () => {
  it('does not set data for invalid arguments', () => {
    invalid.forEach(arg => {
      assert.deepEqual(tried(arg).data, {});
    });
  });

  data.forEach(testCase => {
    const [args, expected] = testCase;

    it(`sets data for ${JSON.stringify(args)}`, () => {
      const trie = Array.isArray(args) ? tried.apply(null, args) : tried(args);
      assert.deepEqual(trie.data, expected);
    });
  });
});

describe('add', () => {
  // test chainable method
  it('returns instance', () => {
    const trie = tried();
    assert.equal(trie.add(), trie);
  });

  data.forEach(testCase => {
    const [args, expected] = testCase;

    it(`adds ${JSON.stringify(args)} to trie`, () => {
      const trie = tried();
      if (Array.isArray(args)) {
        trie.add.apply(trie, args);
      } else {
        trie.add(args);
      }
      assert.deepEqual(trie.data, expected);
    });
  });
});

describe('contains', () => {
  it('returns false for invalid arguments', () => {
    invalid.forEach(arg => {
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
      const trie = Array.isArray(trieArgs)
        ? tried.apply(null, trieArgs)
        : tried(trieArgs);

      it(`returns ${expected} for "${containsArgs}"`, () => {
        assert.strictEqual(trie.contains(containsArgs), expected);
      });
    });
  });
});

describe('get', () => {
  it('returns undefined for invalid arguments', () => {
    invalid.forEach(arg => {
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
      const trie = Array.isArray(trieArgs)
        ? tried.apply(null, trieArgs)
        : tried(trieArgs);

      it(`returns ${expected} for "${containsArgs}"`, () => {
        assert.strictEqual(trie.get(containsArgs), expected);
      });
    });
  });
});

describe('remove', () => {
  // test chainable method
  it('returns instance', () => {
    const trie = tried();
    assert.equal(trie.remove(), trie);
  });

  it('does not remove if argument is invalid', () => {
    const [arg, expected] = data[0];
    const trie = tried(arg);
    trie.remove('');
    invalid.forEach(arg => trie.remove(arg));
    assert.deepEqual(trie.data, expected);
  });

  it('removes all strings from trie', () => {
    const trie = tried('a');
    trie.remove('a');
    assert.deepEqual(trie.data, {});
  });

  it('removes a string from trie', () => {
    const trie = tried('foo', 'bar');
    trie.remove('bar');
    assert.strictEqual(trie.contains('foo'), true);
    assert.strictEqual(trie.contains('bar'), false);
  });

  it('removes multiple strings from trie', () => {
    const trie = tried('foo', 'bar', 'baz', 'qux');
    trie.remove('bar', 'qux');
    assert.strictEqual(trie.contains('foo'), true);
    assert.strictEqual(trie.contains('bar'), false);
    assert.strictEqual(trie.contains('baz'), true);
    assert.strictEqual(trie.contains('qux'), false);
  });

  it('does not remove if string not found', () => {
    const trie = tried('a');
    trie.remove('aa');
    assert.strictEqual(trie.contains('a'), true);
  });

  describe('when trie contains "a" and "ab"', () => {
    it('contains only "ab" when "a" is removed', () => {
      const trie = tried('a', 'ab');
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
