import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const routes = [
  '/claim/new',
  '/invoices/1',
  '/invoices/1/tracking',
  '/schedule/new',
  '/schedule/1',
  '/shiptos/new',
  '/superadmin/deals',
  '/superadmin/tenants',
  '/superadmin/tenants/new',
  '/superadmin/tenants/1',
  '/tenantadmin/deals',
  '/tenantadmin/inquiries',
  '/tenantadmin/locations',
  '/tenantadmin/price-estimation',
  '/tenantadmin/push-notifications',
  '/tenantadmin/quotes'
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
      await new Promise(r => setTimeout(r, 2000));
      
      const fileName = route.substring(1).replace(/\//g, '-');
      const filePath = path.join(outDir, `${fileName}.png`);
      
      await page.screenshot({ path: filePath });
      console.log(`Saved screenshot to ${filePath}`);
    } catch (error) {
      console.error(`Failed to take screenshot for ${url}: ${error.message}`);
    }
  }

  await browser.close();
  console.log('Done with remaining screens!');
})();
