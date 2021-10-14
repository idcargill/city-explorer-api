const axios = require('axios');
const { Forecast } = require('./Forecast');
require('dotenv').config();

const BASE = 'https://api.weatherbit.io/v2.0/forecast/daily';
const KEY = process.env.WEATHER_API_KEY;
const LANG = 'en';
const UNITS = 'I';

const getWeatherApi = async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const weatherApiUrl = `${BASE}?lat=${lat}&lon=${lon}&key=${KEY}&include=alerts&units=${UNITS}&lang=${LANG}`;
    const weatherData = await axios.get(weatherApiUrl);

    // Sort Weather Data Desc
    let results = weatherData.data.data;
    results.sort((a, b) => {
      if (a.datetime > b.datetime) {
        return 1;
      } else if (a.datetime < b.datetime) {
        return -1;
      } else {
        return 0;
      }
    });

    const foreCastArr = results.map((day) => new Forecast(day));

    res.status(200).send(foreCastArr);
  } catch (e) {
    console.log(e);
    res.status(404).send('No Weather Data was found...go fish');
  }
};

module.exports = { getWeatherApi };
