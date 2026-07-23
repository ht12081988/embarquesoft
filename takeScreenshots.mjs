import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/login',
  '/profile',
  '/schedule',
  '/quote',
  '/invoices',
  '/shiptos',
  '/locations',
  '/price',
  '/promo',
  '/notifications',
  '/claim',
  '/superadmin',
  '/tenantadmin'
];

const outDir = path.join(process.cwd(), 'Screens');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a typical mobile size (e.g., iPhone 13 Pro)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    console.log(`Taking screenshot for ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      // Add a small delay for any animations to finish
      await new Promise(r => setTimeout(r, 2000));
      
      const fileName = route === '/' ? 'home' : route.substring(1).replace(/\//g, '-');
      const filePath = path.join(outDir, `${fileName}.png`);
      
      await page.screenshot({ path: filePath });
      console.log(`Saved screenshot to ${filePath}`);
    } catch (error) {
      console.error(`Failed to take screenshot for ${url}: ${error.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
})();
