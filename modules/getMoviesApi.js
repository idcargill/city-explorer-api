const axios = require('axios');
const { Movie } = require('./Movie');
let cache = require('../cache.js');
require('dotenv').config();

// API URL build
const KEY = process.env.MOVIE_API_KEY;
const BASE = 'https://api.themoviedb.org/3/search/movie';
const LANG = 'en';

// Takes in a search string (CITY NAME)
const getMoviesApi = async (req, res) => {
  const key = req.searchQuery;

  if (cache[key] && Date.now() - cache[key].timestamp < 5000) {
    console.log('Cache Movie Hit');
    res.status(200).send(cache[key]);
  }

  try {
    const queryString = req.query.searchQuery;
    const movieApiUrl = `${BASE}?api_key=${KEY}&language=${LANG}-US&page=1&include_adult=false&query=${queryString}`;
    const movies = await axios.get(movieApiUrl);
    const movieDataArr = movies.data.results;

    console.log('Number of movies returned: ', movieDataArr.length);
    // Array of movie Objects
    const movieList = movieDataArr.map((movieData) => new Movie(movieData));

    // console.log(movieList);
    res.status(200).send(movieList);
  } catch (e) {
    console.log(e.message);
    res.status(500).send('You messed up');
  }
};

module.exports = { getMoviesApi };
