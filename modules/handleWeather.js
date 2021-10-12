const path = require('path');
const weather = require('../data/weather.json');
const { Forecast } = require('./Forecast.js');

// City Weather API Response
const handleWeather = (req, res) => {
  try {
    console.log(req.query);
    const city = req.query.searchQuery;

    // Find city weather for request
    let results = weather.find(
      (w) =>
        w.city_name.toLocaleLowerCase() === city.toLocaleLowerCase() ||
        (w.lat === req.query.lat && w.lon === req.query.lon)
    );

    // Forecast Data Object
    let forecastArr = results.data.map((day) => {
      let lowTemp = day.low_temp;
      let highTemp = day.high_temp;
      let desc = day.weather.description;
      let date = day.datetime;
      let description = `Low of ${lowTemp}, high of ${highTemp} with ${desc}`;
      return new Forecast(date, description);
    });

    // Handle Response
    if (results) {
      res.status(200).send(forecastArr);
    } else {
      res.status(404).send('City not found');
    }
  } catch (e) {
    res.status(500).sendFile(path.join(__dirname, '../pages/error500.html'));
  }
};

module.exports = { handleWeather };
