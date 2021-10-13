const axios = require('axios');
require('dotenv').config();

const BASE = 'https://api.weatherbit.io/v2.0/forecast/daily';
const KEY = process.env.WEATHER_API_KEY;
const LANG = 'en';
const UNITS = 'I';

const getWeatherApi = async (lat, lon) => {
  try {
    const weatherApiUrl = `${BASE}?lat=${lat}&lon=${lon}&key=${KEY}&include=alerts&units=${UNITS}&lang=${LANG}`;
    const weatherData = await axios.get(weatherApiUrl);
    return weatherData;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getWeatherApi };
