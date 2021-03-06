class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.average_votes = data.vote_average;
    this.image_url = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    this.popularity = data.popularity;
    this.released_on = data['release_date'];
  }
}

module.exports = { Movie };
