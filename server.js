const express = require('express');
const cors = require('cors');
const path = require('path');
const { handleWeather } = require('./modules/handleWeather');
require('dotenv').config;

// Express Structure
const app = express();
app.use(cors());

// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Home
app.get('/', (req, res) => {
  res.status('200').sendFile(path.join(__dirname, '/pages/weatherHome.html'));
});

// API
app.get('/weather', (req, res) => handleWeather(req, res));

// ERROR 404
app.get('*', (req, res) => {
  res.status('404').sendFile(path.join(__dirname, './pages/error404.html'));
});
