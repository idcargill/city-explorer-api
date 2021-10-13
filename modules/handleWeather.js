const path = require('path');
const { Forecast } = require('./Forecast.js');
const { getWeatherApi } = require('./getWeatherApi');
require('dotenv').config();

// City Weather API Response
// Takes in lat/lon from req
// Passes lat/lon to getWeatherApi
// returns sorted array of Forecast objects to client response
const handleWeather = async (req, res) => {
  try {
    console.log(req.query);
    // Take in request lat/lon
    let { lat, lon } = req.query;

    // Send lat/lon to Weatherbit
    let weatherData = await getWeatherApi(lat, lon);

    // Sort Weather Data Desc
    let results = weatherData.data.data;
    results.sort((a, b) => {
      if (a.datetime > b.datetime) {
        return -1;
      } else if (a.datetime < b.datetime) {
        return 1;
      } else {
        return 0;
      }
    });

    // Forecast Data Object
    let forecastArr = results.map((day) => {
      let lowTemp = day.low_temp;
      let highTemp = day.high_temp;
      let desc = day.weather.description;
      let date = day.datetime;
      let description = `Low of ${lowTemp}, high of ${highTemp} with ${desc}`;
      return new Forecast(date, description);
    });

    // Send Response
    if (results) {
      res.status(200).send(forecastArr);
    } else {
      res.status(404).send('City not found');
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).sendFile(path.join(__dirname, '../pages/error500.html'));
  }
};

module.exports = { handleWeather };
