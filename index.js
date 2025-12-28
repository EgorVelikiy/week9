const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/login/', (_, res) => {
  res.send('20cf5726-c4a6-4653-b049-6e72b934e3d4');
});

app.get('/test/', async (req, res) => {
  const targetURL = req.query.URL;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  console.log(targetURL)

  const page = await browser.newPage();
  await page.goto(targetURL, { waitUntil: 'networkidle2' });

  await page.waitForSelector('#bt');
  await page.click('#bt');

  await page.waitForFunction(() => {
    const input = document.querySelector('#inp');
    return input.value;
  }, { timeout: 5000 });

  const result = await page.evaluate(() => {
    return document.querySelector('#inp').value;
  });

  await browser.close();
  res.type('text/plain');
  res.send(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

