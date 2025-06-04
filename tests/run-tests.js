const fs = require('fs');
const path = require('path');

const testFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js'));
for (const file of testFiles) {
  require(path.join(__dirname, file));
}
