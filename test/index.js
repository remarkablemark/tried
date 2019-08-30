const assert = require('assert');
const trieste = require('..');
const Trie = require('../lib/trie');
const { END_KEY: KEY, END_VALUE: VALUE } = require('../lib/constants');
const { data, invalid } = require('./data');

describe('trieste', () => {
  it('returns Trie instance', () => {
    assert.strictEqual(trieste().constructor, Trie);
  });

  it('sets default options', () => {
    assert.deepEqual(trieste().options, {
      endKey: KEY,
      endValue: VALUE
    });
  });

  it('overrides default options', () => {
    assert.deepEqual(trieste({ endValue: true }).options, {
      endKey: KEY,
      endValue: true
    });
    assert.deepEqual(trieste({ endKey: '$', endValue: '\n' }).options, {
      endKey: '$',
      endValue: '\n'
    });
  });

  it('does not override default options if invalid', () => {
    invalid.forEach(arg => {
      assert.deepEqual(trieste(arg).options, {
        endKey: KEY,
        endValue: VALUE
      });
    });
  });
});

describe('add', () => {
  // test chainable method
  it('returns instance', () => {
    const trie = trieste();
    assert.equal(trie.add(), trie);
  });

  it('adds "a" with custom end key and value to trie', () => {
    const endKey = 'END_KEY';
    const endValue = 'END_VALUE';
    const trie = trieste({ endKey, endValue });
    trie.add('a');
    assert.deepEqual(trie.data, { a: { [endKey]: endValue } });
  });

  data.forEach(testCase => {
    const [args, expected] = testCase;

    it(`adds ${JSON.stringify(args)} to trie`, () => {
      const trie = trieste();
      if (Array.isArray(args)) {
        trie.add.apply(trie, args);
      } else {
        trie.add(args);
      }
      assert.deepEqual(trie.data, expected);
    });
  });

  describe('when string has custom value', () => {
    it('adds {"a":"b","c":"d"} to trie', () => {
      const trie = trieste();
      trie.add({ a: 'b', c: 'd' });
      assert.deepEqual(trie.data, { a: { [KEY]: 'b' }, c: { [KEY]: 'd' } });
    });

    it('allows anything to be set as the value', () => {
      const trie = trieste();
      invalid.forEach(arg => {
        trie.add({ a: arg });
        assert.deepEqual(trie.data, { a: { [KEY]: arg } });
      });
    });
  });
});

describe('contains', () => {
  it('returns false for invalid arguments', () => {
    const trie = trieste();
    invalid.forEach(arg => {
      assert.strictEqual(trie.contains(arg), false);
    });
  });

  it('works when string has custom end key and value', () => {
    const endKey = 'END_KEY';
    const endValue = 'END_VALUE';
    const trie = trieste({ endKey, endValue });
    trie.add('a', 'ab');
    assert.strictEqual(trie.contains('ab'), true);
    assert.strictEqual(trie.contains('abc'), false);
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
      const trie = trieste();
      if (Array.isArray(trieArgs)) {
        trie.add.apply(trie, trieArgs);
      } else {
        trie.add(trieArgs);
      }

      it(`returns ${expected} for "${containsArgs}"`, () => {
        assert.strictEqual(trie.contains(containsArgs), expected);
      });
    });
  });
});

describe('get', () => {
  it('returns undefined for invalid arguments', () => {
    invalid.forEach(arg => {
      assert.strictEqual(trieste().get(arg), undefined);
    });
  });

  it('works when string has custom end key and value', () => {
    const endKey = 'END_KEY';
    const endValue = 'END_VALUE';
    const trie = trieste({ endKey, endValue });
    trie.add('a');
    assert.strictEqual(trie.get('a'), endValue);
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
      const trie = trieste();
      if (Array.isArray(trieArgs)) {
        trie.add.apply(trie, trieArgs);
      } else {
        trie.add(trieArgs);
      }

      it(`returns ${expected} for "${containsArgs}"`, () => {
        assert.strictEqual(trie.get(containsArgs), expected);
      });
    });
  });
});

describe('remove', () => {
  // test chainable method
  it('returns instance', () => {
    const trie = trieste();
    assert.equal(trie.remove(), trie);
  });

  it('removes string with custom end key from trie', () => {
    const trie = trieste({ endKey: 1, endValue: 2 });
    trie.add('a');
    trie.remove('a');
    assert.deepEqual(trie.data, {});
  });

  it('does not remove if argument is invalid', () => {
    const [arg, expected] = data[0];
    const trie = trieste();
    trie.add(arg);
    trie.remove('');
    invalid.forEach(arg => trie.remove(arg));
    assert.deepEqual(trie.data, expected);
  });

  it('removes all strings from trie', () => {
    const trie = trieste();
    trie.add('a');
    trie.remove('a');
    assert.deepEqual(trie.data, {});
  });

  it('removes a string from trie', () => {
    const trie = trieste();
    trie.add('foo', 'bar');
    trie.remove('bar');
    assert.strictEqual(trie.contains('foo'), true);
    assert.strictEqual(trie.contains('bar'), false);
  });

  it('removes multiple strings from trie', () => {
    const trie = trieste();
    trie.add('foo', 'bar', 'baz', 'qux');
    trie.remove('bar', 'qux');
    assert.strictEqual(trie.contains('foo'), true);
    assert.strictEqual(trie.contains('bar'), false);
    assert.strictEqual(trie.contains('baz'), true);
    assert.strictEqual(trie.contains('qux'), false);
  });

  it('does not remove if string not found', () => {
    const trie = trieste();
    trie.add('a');
    trie.remove('aa');
    assert.strictEqual(trie.contains('a'), true);
  });

  it('removes {"a":"b"} from trie', () => {
    const trie = trieste();
    trie.add({ a: 'b' });
    trie.remove('a');
    assert.deepEqual(trie.data, {});
  });

  describe('when trie contains "a" and "ab"', () => {
    const trie = trieste();
    trie.add('a', 'ab');
    const expected = {
      a: {
        [KEY]: VALUE,
        b: {
          [KEY]: VALUE
        }
      }
    };

    it('contains only "ab" when "a" is removed', () => {
      assert.deepEqual(trie.data, expected);
      trie.remove('a');
      delete expected.a[KEY];
      assert.deepEqual(trie.data, expected);
    });
  });
});
