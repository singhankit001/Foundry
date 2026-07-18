const puppeteer = require('puppeteer');

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // High-res "Luxury" viewport
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  
  console.log("Navigating to http://localhost:3055...");
  await page.goto('http://localhost:3055', { waitUntil: 'networkidle0' });
  
  // Hide scrollbars for a cleaner look
  await page.addStyleTag({content: 'body::-webkit-scrollbar { display: none; }'});
  
  console.log("Taking full page screenshot...");
  await page.screenshot({ path: 'public/dashboard_full.png', fullPage: true });

  console.log("Taking hero screenshot...");
  await page.screenshot({ 
    path: 'public/dashboard_hero.png', 
    clip: { x: 0, y: 0, width: 1920, height: 900 }
  });

  console.log("Taking methodology screenshot...");
  // Find methodology section approx coordinates
  await page.screenshot({ 
    path: 'public/dashboard_methodology.png', 
    clip: { x: 0, y: 1500, width: 1920, height: 950 }
  });

  await browser.close();
  console.log("Done.");
})();
