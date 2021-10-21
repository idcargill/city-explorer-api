const weather = require('./weather');

function weatherHandler(request, response) {
  console.log(request.query);
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then((summaries) => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}

module.exports = weatherHandler;
