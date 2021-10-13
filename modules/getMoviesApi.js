const axios = require('axios');
const { Movie } = require('./Movie');
require('dotenv').config();

// API URL build
const KEY = process.env.MOVIE_API_KEY;
const BASE = 'https://api.themoviedb.org/3/search/movie';
const LANG = 'en';

// Takes in a search string (CITY NAME)
const searchMoviesApi = async (req, res) => {
  try {
    const queryString = req.query.seachQuery;
    const movieApiUrl = `${BASE}?api_key=${KEY}&language=${LANG}-US&page=1&include_adult=false&query=${queryString}`;
    const movies = await axios.get(movieApiUrl);

    const movieDataArr = movies.data.results;

    // Sort list by Popularity
    movieDataArr.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return 1;
      } else if (a.popularity < b.popularity) {
        return -1;
      } else {
        return 0;
      }
    });
    const movieList = movieDataArr.map((movieData) => new Movie(movieData));

    if (!movieDataArr) {
      res.status(404).send('We aint find nothin');
      throw new Error('No movie data found');
    }
    res.status(200).send(movieList);
  } catch (e) {
    console.log(e.message);
    res.status(500).send('You messed up');
  }
};

module.exports = { searchMoviesApi };
