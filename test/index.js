const assert = require('assert');
const tried = require('..');
const { data, VALUE } = require('./data');

describe('data', () => {
  [undefined, null, 0, 1].forEach(arg => {
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

  data.forEach(testCase => {
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
    describe(`when arguments=[${arg.constructor.name}]`, () => {
      it('returns false', () => {
        assert.strictEqual(tried().contains(arg), false);
      });
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

    describe(`when trie arguments=[${JSON.stringify(
      trieArgs
    )}] and contains arguments=[${JSON.stringify(containsArgs)}]`, () => {
      it(`returns ${expected}`, () => {
        assert.strictEqual(tried(trieArgs).contains(containsArgs), expected);
      });
    });
  });
});

describe('get', () => {
  [undefined, null, 0, 1].forEach(arg => {
    describe(`when arguments=[${arg}]`, () => {
      it('returns undefined', () => {
        assert.strictEqual(tried().get(arg), undefined);
      });
    });
  });

  [{}, [], () => {}, new Date()].forEach(arg => {
    describe(`when arguments=[${arg.constructor.name}]`, () => {
      it('returns undefined', () => {
        assert.strictEqual(tried().get(arg), undefined);
      });
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

    describe(`when trie arguments=[${JSON.stringify(
      trieArgs
    )}] and contains arguments=[${JSON.stringify(containsArgs)}]`, () => {
      it(`returns ${expected}`, () => {
        assert.strictEqual(tried(trieArgs).get(containsArgs), expected);
      });
    });
  });
});

describe('add', () => {
  data.forEach(testCase => {
    const [args, expected] = testCase;

    describe(`when arguments=[${JSON.stringify(args)}]`, () => {
      it(`adds the string(s) to the trie`, () => {
        const trie = tried();
        trie.add(args);
        assert.deepEqual(trie.data, expected);
      });
    });
  });
});
