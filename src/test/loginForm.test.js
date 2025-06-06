const assert = require('assert');

async function loadModule() {
  return await import('./loginForm.js');
}

function setupDocument(username, password) {
  global.document = {
    getElementById(id) {
      if (id === 'Tea-login-username') {
        return {
          value: username,
          getAttribute(attr) { return attr === 'warn' ? 'username required' : null; }
        };
      }
      if (id === 'Tea-login-password') {
        return {
          value: password,
          getAttribute(attr) { return attr === 'warn' ? 'password required' : null; }
        };
      }
      return null;
    }
  };
}

(async () => {
  const { TeaLoginForm } = await loadModule();

  // should return username and password
  setupDocument('user', 'pass');
  let result = await TeaLoginForm();
  assert.deepStrictEqual(result, { username: 'user', password: 'pass' });

  // values should be trimmed before validation
  setupDocument('  user  ', '  pass  ');
  result = await TeaLoginForm();
  assert.deepStrictEqual(result, { username: 'user', password: 'pass' });

  // should throw when username empty
  setupDocument('', 'pass');
  await TeaLoginForm().then(() => assert.fail('expected error'), err => {
    assert.strictEqual(err, 'username required');
  });

  // should throw when password empty
  setupDocument('user', '');
  await TeaLoginForm().then(() => assert.fail('expected error'), err => {
    assert.strictEqual(err, 'password required');
  });

  console.log('All tests passed');
})();
