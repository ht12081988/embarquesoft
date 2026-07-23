const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.match(/<label[^>]*className="[^"]*font-bold[^"]*"/g)) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src/app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/(<label[^>]*className="[^"]*)font-bold([^"]*")/g, '$1font-normal$2');
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Updated ' + files.length + ' files');
