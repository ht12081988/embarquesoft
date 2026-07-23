const fs = require('fs');
let content = fs.readFileSync('src/app/price/page.tsx', 'utf8');
content = content.replace(/className="text-black font-normal text-black uppercase tracking-wide"/g, 'className="text-black text-[13px] ml-1"');
fs.writeFileSync('src/app/price/page.tsx', content, 'utf8');
console.log('done');
