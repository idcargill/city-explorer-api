// Class Forecast
// holds 1 day of weather data compiled in description

class Forecast {
  constructor(data) {
    this.lowTemp = data.low_temp;
    this.highTemp = data.highTemp;
    this.desc = data.weather.description;
    this.date = data.datetime;
    this.description = `Low of ${this.lowTemp}, high of ${this.highTemp} with ${this.desc}`;
  }
}

module.exports = { Forecast };
