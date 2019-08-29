# tried

[![NPM](https://nodei.co/npm/tried.png)](https://nodei.co/npm/tried/)

[![NPM version](https://img.shields.io/npm/v/tried.svg)](https://www.npmjs.com/package/tried)
[![Build Status](https://travis-ci.org/remarkablemark/tried.svg?branch=master)](https://travis-ci.org/remarkablemark/tried)
[![Coverage Status](https://coveralls.io/repos/github/remarkablemark/tried/badge.svg?branch=master)](https://coveralls.io/github/remarkablemark/tried?branch=master)

[Trie](https://wikipedia.org/wiki/Trie) generator.

## Installation

[NPM](https://www.npmjs.com/package/tried):

```sh
$ npm install tried --save
```

[Yarn](https://yarnpkg.com/package/tried):

```sh
$ yarn add tried
```

[CDN](https://unpkg.com/tried/):

```html
<script src="https://unpkg.com/tried@latest/dist/tried.min.js"></script>
```

## Usage

### Module

Import the module:

```js
// CommonJS
const tried = require('tried');

// ES Modules
import tried from 'tried';
```

### Trie

Create a trie instance:

```js
const trie = tried();
```

Alternatively, this can be done by instantiating the constructor:

```js
const Trie = require('tried/lib/trie');
const trie = new Trie();
```

#### Options

You can set options for each instance:

```js
const options = {
  endKey: 'END_OF_STRING_KEY',
  endValue: 'END_OF_STRING_VALUE'
};
const trie = tried(options);
```

Alternatively, this can be done using the constructor:

```js
const Trie = require('tried/lib/trie');

const trie = new Trie({
  endKey: 'END_OF_STRING_KEY',
  endValue: 'END_OF_STRING_VALUE'
});
```

Options are found on the instance's `options` property:

```js
trie.options;
```

The default options are:

```js
{
  endKey: '$$',
  endValue: 1
}
```

Options have a direct effect on the trie's [data](#data) and methods like [add](#add) and [get](#add).

#### Data

Data can be found on the instance's `data` property:

```js
trie.data;
```

Data is a POJO (Plain Old JavaScript Object), which means it can be converted to [JSON](https://www.json.org/):

```js
JSON.stringify(trie.data);
```

As an example, the following is the output of `tried().add('a').data`:

```js
{ a: { '$$': 1 } }
```

### Methods

#### Add

Add a string to the trie:

```js
trie.add('foo');
```

Add multiple strings to the trie:

```js
trie.add('foo', 'bar');
```

Add an array of strings to the trie:

```js
trie.add.apply(trie, ['foo', 'bar']);
```

Add a string with a value to the trie:

```js
trie.add({ answer: 42 });
```

This is useful if you want to store value(s) other than the default. See method [get](#get) on how to retrieve a string value.

Since the method returns its own instance, method chaining is possible:

```js
trie.add('foo').add('bar');
```

Arguments that are not type `string` will be skipped.

#### Contains

Check if a string is found in the trie:

```js
trie.contains('foo');
```

The method returns a `boolean` value.

Arguments that are not type `string` will return `false`.

#### Get

Get a string value from the trie:

```js
trie.get('foo');
```

The value comes from `options.endValue`, which is `1` by default:

```js
trie.add('foo').get('foo'); // 1
```

The value can be set using the [add](#add) method:

```js
trie.add({ foo: 'bar' }).get('foo'); // 'bar'
```

The value can also be set in [options](#options):

```js
const trie = tried({ endValue: null });
trie.add('foo').get('foo'); // null
```

Arguments that are not type `string` will return `undefined`.

#### Remove

Remove a string from the trie:

```js
trie.remove('foo');
```

Remove multiple strings from the trie:

```js
trie.remove('foo', 'bar');
```

Remove an array of strings from the trie:

```js
trie.remove.apply(trie, ['foo', 'bar']);
```

Since the method returns its own instance, method chaining is possible:

```js
trie.remove('foo').remove('bar');
```

Arguments that are not type `string` will be skipped.

## Testing

Run tests:

```sh
$ npm test
```

Run tests in watch mode:

```sh
$ npm run test:watch
```

Run tests with coverage:

```sh
$ npm run test:coverage
```

View coverage in browser:

```sh
$ npm run test:coverage:report
$ open coverage/index.html
```

Lint files:

```sh
$ npm run lint
```

Fix lint errors:

```sh
$ npm run lint:fix
```

## Release

Only collaborators with credentials can release and publish:

```sh
$ npm run release
$ git push --follow-tags && npm publish
```

## License

[MIT](https://github.com/remarkablemark/tried/blob/master/LICENSE)
