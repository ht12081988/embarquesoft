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
      results.push(file);
    }
  });
  return results;
}

function toTitleCase(str) {
  return str.split(' ').map(word => {
    if (word.trim().length === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

const files = walk('src/app');
let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  content = content.replace(/(<label[^>]*className="[^"]*)("?[^>]*>)(.*?)(<\/label>)/g, (match, classAttr, restOfOpen, innerHtml, closeTag) => {
    
    // Make text black
    let newClassAttr = classAttr;
    if (!newClassAttr.includes('text-black')) {
      newClassAttr = newClassAttr.replace(/text-\[[^\]]+\]/, 'text-black');
      newClassAttr = newClassAttr.replace(/text-[a-z]+-[0-9]+/, 'text-black');
    }
    
    let newInner = innerHtml.replace(/(^|>)([^<]+)(<|$)/g, (m2, p1, p2, p3) => {
      // Don't title case purely whitespace or symbols
      if (p2.trim().length === 0) return p1 + p2 + p3;
      return p1 + toTitleCase(p2) + p3;
    });
    
    if (match !== newClassAttr + restOfOpen + newInner + closeTag) {
        changed = true;
    }
    return newClassAttr + restOfOpen + newInner + closeTag;
  });
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
});
console.log('Updated ' + count + ' files');
