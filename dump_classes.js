const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const inputClasses = new Set();
walkDir('src/app', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const regex = /<(?:input|textarea|select)[^>]+className=["']([^"']+)["']/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      inputClasses.add(match[1]);
    }
  }
});
inputClasses.forEach(c => console.log(c));
