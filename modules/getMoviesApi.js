const axios = require('axios');
const { Movie } = require('./Movie');
let cache = require('./cache.js');
require('dotenv').config();

// API URL build
const KEY = process.env.MOVIE_API_KEY;
const BASE = 'https://api.themoviedb.org/3/search/movie';
const LANG = 'en';

// Takes in a search string (CITY NAME)
const getMoviesApi = async (req, res) => {
  const key = req.query.searchQuery;
  console.log(req.query);

  if (cache[key] && Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24) {
    console.log('Cache Movie Hit');
    res.status(200).send(cache[key]);
  } else {
    try {
      console.log('Cache Movie miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();

      const queryString = req.query.searchQuery;
      const movieApiUrl = `${BASE}?api_key=${KEY}&language=${LANG}-US&page=1&include_adult=false&query=${queryString}`;
      const movies = await axios.get(movieApiUrl);
      const movieDataArr = movies.data.results;

      console.log('Number of movies returned: ', movieDataArr.length);

      // Array of movie Objects
      const movieList = movieDataArr.map((movieData) => new Movie(movieData));
      console.log('movies to send:', movieList);
      // Set movie obj to cache
      cache[key].movies = movieList;
      res.status(200).send(cache[key]);
    } catch (e) {
      console.log(e.message);
      res
        .status(500)
        .send('We probably messed up, but it might have been you.');
    }
  }
};

module.exports = { getMoviesApi };
