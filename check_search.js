const fs = require('fs');
const files = [
  'src/app/shiptos/page.tsx',
  'src/app/schedule/page.tsx',
  'src/app/locations/page.tsx',
  'src/app/invoices/page.tsx',
  'src/app/claim/page.tsx'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    console.log('---', f, '---');
    const content = fs.readFileSync(f, 'utf8');
    const match = content.match(/<div className="[^"]*bg-[^"]*"[^>]*>[\s\S]*?<Search[\s\S]*?<\/div>/);
    if (match) console.log(match[0]);
  }
});
