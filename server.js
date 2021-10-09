const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const { Forecast } = require('./Forecast.js');
require('dotenv').config;

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Root
app.get('/', (req, res) => {
  res.status('200').send('Welcome to City-Explorer-API');
});

app.get('/weather', (req, res) => {
  console.log(req.query);

  const query = req.query;
  const city = req.query.searchQuery;

  let results = weather.find(
    (w) => w.city_name === city || (w.lat === query.lat && w.lon === query.lon)
  );

  // Forecast Data response
  let forecastArr = results.data.map((day) => {
    let lowTemp = day.low_temp;
    let highTemp = day.high_temp;
    let desc = day.weather.description;
    let date = day.datetime;
    let description = `Low of ${lowTemp}, high of ${highTemp} with ${desc}`;
    return new Forecast(date, description);
  });

  if (results) {
    res.status('200').send(forecastArr);
  } else {
    res.status('404').send('City not found');
  }
});

// ERROR 404
app.get('*', (req, res) => {
  res.status('404').send('We don\t know what you are looking for');
});
