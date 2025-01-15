
require('dotenv').config();

const express = require('express');
const { resolve } = require('path');

const app = express();
const port = process.env.PORT || 3010;

if (!process.env.API_KEY || !process.env.SERVER_SECRET) {
  console.error('Error: Missing API_KEY or SERVER_SECRET in .env');
  process.exit(1);
}

app.use(express.static(resolve(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/config', (req, res) => {
  res.json({
    apiKey: process.env.API_KEY,
    serverSecret: process.env.SERVER_SECRET,
    isKalvian: process.env.IS_KALVIAN === 'true',
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
