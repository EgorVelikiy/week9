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
  })

  const page = await browser.newPage();
  await page.goto(targetURL, { waitUntil: 'networkidle2' });

  await page.click('#bt');

  await page.waitForFunction(() => {
    const input = document.querySelector('#inp');
    return input.value;
  }, { timeout: 1000 });

  const result = await page.evaluate(() => {
    return document.querySelector('#inp').value;
  });

  await browser.close();

  res.send(result);
});

const PORT = 443;

app.listen(PORT);
