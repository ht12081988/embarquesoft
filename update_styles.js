const fs = require('fs');

const filesToUpdate = [
  'src/app/schedule/new/page.tsx',
  'src/app/shiptos/new/page.tsx',
  'src/app/profile/page.tsx',
  'src/app/quote/page.tsx',
  'src/app/points/page.tsx',
  'src/app/price/page.tsx',
  'src/app/locations/page.tsx'
];

filesToUpdate.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('Skipping ' + filePath + ' (does not exist)');
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Convert input/select padding to h-12 and rounded-xl
  content = content.replace(/rounded-xl px-4 py-3\.5/g, 'rounded-xl px-4 h-12');
  content = content.replace(/rounded-xl pl-10 pr-4 py-3\.5/g, 'rounded-xl pl-10 pr-4 h-12');
  
  // 2. Convert primary form buttons that use rounded-full py-3.5
  content = content.replace(/py-3\.5 rounded-full/g, 'h-12 rounded-xl flex items-center justify-center');
  
  // 3. For any other full width buttons that have py-3 or py-3.5 and rounded-full
  content = content.replace(/className="w-full ([^"]*) bg-\[#eb5b27\] text-white font-(semibold|bold) text-\[1[34]px\] py-[^\s]+ rounded-full/g, 'className="w-full $1 bg-[#eb5b27] text-white font-$2 text-[13px] h-12 rounded-xl flex items-center justify-center');
  content = content.replace(/className="w-full bg-\[#eb5b27\] text-white font-(semibold|bold) text-\[1[34]px\] py-[^\s]+ rounded-full/g, 'className="w-full bg-[#eb5b27] text-white font-$1 text-[13px] h-12 rounded-xl flex items-center justify-center');
  
  // 4. Any other specific text inputs that might have rounded-full (if any)
  content = content.replace(/className="flex-1 px-4 py-3\.5 text-sm/g, 'className="flex-1 px-4 h-12 text-sm');

  // Fix buttons in profile/page.tsx
  content = content.replace(/bg-gray-100 text-gray-700 font-bold rounded-full/g, 'bg-gray-100 text-gray-700 font-bold rounded-xl');
  content = content.replace(/bg-red-500 text-white font-bold rounded-full/g, 'bg-red-500 text-white font-bold rounded-xl');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + filePath);
  } else {
    console.log('No changes in ' + filePath);
  }
});
