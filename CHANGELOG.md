# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.1.0 (2019-08-30)


### Bug Fixes

* **index:** do not override nodes that share the same key ([5ae0d9c](https://github.com/remarkablemark/tried/commit/5ae0d9c))
* **index:** make sure to delete the correct key during remove ([098a216](https://github.com/remarkablemark/tried/commit/098a216))


### Build System

* **package:** build umd library with rollup ([adc37db](https://github.com/remarkablemark/tried/commit/adc37db))
* **package:** minify rollup output with uglifyjs ([e376252](https://github.com/remarkablemark/tried/commit/e376252))


### Features

* change methods so arguments are accepted instead of one ([e8ceb14](https://github.com/remarkablemark/tried/commit/e8ceb14))
* **index:** accept string argument for trie functions ([64c9910](https://github.com/remarkablemark/tried/commit/64c9910))
* clone project from `npm-package-template` ([9eab0ad](https://github.com/remarkablemark/tried/commit/9eab0ad))
* **index:** accept an array of strings as 1st argument for `remove` ([608aad1](https://github.com/remarkablemark/tried/commit/608aad1))
* **index:** add `contains` that returns false for invalid argument ([d84e597](https://github.com/remarkablemark/tried/commit/d84e597))
* **index:** add `get` method that returns the end of word value ([879a7f1](https://github.com/remarkablemark/tried/commit/879a7f1))
* **index:** add `remove` to remove a string from the trie ([4f205ee](https://github.com/remarkablemark/tried/commit/4f205ee))
* **index:** add constructor `Trie` and update main export `tried` ([5c41248](https://github.com/remarkablemark/tried/commit/5c41248))
* **index:** add end of word constants and generate basic trie ([32e016b](https://github.com/remarkablemark/tried/commit/32e016b))
* **index:** allow `add` to method chain by returning trie instance ([2ad16cf](https://github.com/remarkablemark/tried/commit/2ad16cf))
* **index:** include `add` method that adds words to trie ([4bb9f00](https://github.com/remarkablemark/tried/commit/4bb9f00))
* **index:** return `{}` when `undefined` or `[]` is passed ([f4d6a6b](https://github.com/remarkablemark/tried/commit/f4d6a6b))
* **index:** update `contains` to check if string is in trie ([1f1f8fa](https://github.com/remarkablemark/tried/commit/1f1f8fa))
* **index:** update arguments that can return `{}` ([4229e25](https://github.com/remarkablemark/tried/commit/4229e25))
* **lib:** add `utilities.assign`, which polyfills `Object.assign` ([5b187eb](https://github.com/remarkablemark/tried/commit/5b187eb))
* update `tried` & `Trie` to receive options instead of arguments ([a937202](https://github.com/remarkablemark/tried/commit/a937202))
* **lib:** update `add` and `remove` to use options ([be41621](https://github.com/remarkablemark/tried/commit/be41621))
* **lib:** update `add` to allow custom value to be set ([350be0e](https://github.com/remarkablemark/tried/commit/350be0e))
* **lib:** update `contains` and `get` to use options ([eadd0af](https://github.com/remarkablemark/tried/commit/eadd0af))


### Tests

* **data:** refactor tests and move invalid arguments to data ([325533b](https://github.com/remarkablemark/tried/commit/325533b))
* **index:** add more test cases ([8d00f45](https://github.com/remarkablemark/tried/commit/8d00f45))
* **index:** add test case for 'remove' if argument is invalid ([ec99efd](https://github.com/remarkablemark/tried/commit/ec99efd))
* **index:** add test for adding to and removing from trie ([0533fde](https://github.com/remarkablemark/tried/commit/0533fde))
* **index:** add tests for `add` and `remove` with custom options ([b3f4d7e](https://github.com/remarkablemark/tried/commit/b3f4d7e))
* **index:** add tests for `contains` and `get` with custom options ([c998122](https://github.com/remarkablemark/tried/commit/c998122))
* **index:** fix incorrect test in 'add' ([fb875e3](https://github.com/remarkablemark/tried/commit/fb875e3))
* **index:** move test data & constants from `index.js` to `data.js` ([ccc1eaa](https://github.com/remarkablemark/tried/commit/ccc1eaa))
* **index:** organize tests under suite `data` ([c882101](https://github.com/remarkablemark/tried/commit/c882101))
* **index:** refactor add/remove test to use key/value constants ([6f8ef27](https://github.com/remarkablemark/tried/commit/6f8ef27))
* **index:** replace `assert.ok` with `assert.strictEqual` ([a72c841](https://github.com/remarkablemark/tried/commit/a72c841))
* **index:** tidy tests so they're more readable ([85e5ffa](https://github.com/remarkablemark/tried/commit/85e5ffa))
* **index:** update the 'add' test suite to use the data ([3fa8794](https://github.com/remarkablemark/tried/commit/3fa8794))
* **index:** verify string is not removed from trie if not found ([61bec46](https://github.com/remarkablemark/tried/commit/61bec46))
* **utilities:** add case for 'assign' when source is not an object ([e679b67](https://github.com/remarkablemark/tried/commit/e679b67))
* refactor test files to use constants from `lib/constants.js` ([f52a539](https://github.com/remarkablemark/tried/commit/f52a539))
* **utilities:** add tests for `utilities.isObjectEmpty` ([3053868](https://github.com/remarkablemark/tried/commit/3053868))
