'use strict';
const axios = require('axios');
let cache = require('./cache.js');

module.exports = getWeather;

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

async function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;
  // console.log('cache key: ', key);
  // Weather data cached for 5 minutes
  if (cache[key] && Date.now() - cache[key].timestamp < 1000 * 60 * 5) {
    console.log('Cache hit');
    return cache[key];
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    await axios.get(url).then((response) => {
      parseWeather(response.data).then((data) => (cache[key].data = data));
    });
    // console.log(cache[key]);
    return cache[key];
  }
}

// parses weather data into Weather Class objects array
function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map((day) => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}
