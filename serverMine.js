const express = require('express');
const cors = require('cors');
const path = require('path');
const { getWeatherApi } = require('./modules/getWeatherApi');
const { getMoviesApi } = require('./modules/getMoviesApi');

// Express Structure
const app = express();
app.use(cors());

// Port set env or default
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Home/Root
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/pages/weatherHome.html'));
});

// API - Weather
app.get('/weather', (req, res) => getWeatherApi(req, res));

// API - Movies
app.get('/movie', (req, res) => getMoviesApi(req, res));

// ERROR 404
app.get('*', (req, res) => {
  res.status(500).sendFile(path.join(__dirname, './pages/error404.html'));
});
