const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

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

  const response = await axios.get(targetURL);
  const html = response.data;

  const $ = cheerio.load(html);

  // Берём значение из инпута с id="inp"
  const result = $('#inp').val() || '';

  res.type('text/plain');
  res.send(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

