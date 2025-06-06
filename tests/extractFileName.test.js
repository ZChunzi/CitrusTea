const assert = require('assert');
const { extractFileName } = require('../src/utils/teaHelpers');

assert.strictEqual(extractFileName('/views/demo.tea'), 'demo');
assert.strictEqual(extractFileName('a/b/c/test.tea'), 'test');
assert.strictEqual(extractFileName('/noext'), null);
console.log('extractFileName tests passed');
