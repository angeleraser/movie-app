const apiKey = "5c6f33506fa3fff58d277e58e3b09296";

class Movie {
  constructor({ id, title, photoUrl, rating, description }) {
    this.id = id;
    this.title = title;
    this.photoUrl = photoUrl;
    this.rating = rating || 1;
    this.ratingLevel = this.evalVoteAverage(this.rating);
    this.description = description;
  }

  evalVoteAverage(vote) {
    if (vote <= 3) return "low";
    if (vote > 3 && vote <= 6) return "medium";
    return "high";
  }
}

/**
 * @param {*} keyword
 * @returns {Promise<Movie[]>}
 */
export async function getMoviesBy(keyword) {
  let url = `https://api.themoviedb.org/3/search/movie?query=${keyword}`;

  if (!keyword) {
    url =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1";
  }

  const response = await fetch(`${url}&api_key=${apiKey}`);

  const data = await response.json();

  return data.results.map((movie) => {
    return new Movie({
      id: movie.id,
      title: movie.title,
      photoUrl: `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`,
      rating: Number(movie.vote_average.toFixed(2)),
      description: `${movie.overview || "No description"}`,
    });
  });
}
