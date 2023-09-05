import { getMoviesBy } from "./services/movies.js";
import { createHtmlTemplate } from "./utils/create-template.js";

const searchFormEl = document.getElementById("search-form");
const searchInputEl = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies-container");

function createMovieCardTemplate(props) {
  return createHtmlTemplate`
  <article class="movie-card">
    <img src="${"photoUrl"}" alt="${"title"}" class="movie-card-img" />
    <div class="movie-card-detail">
      <h3 class="movie-card-title">${"title"}</h3>
      <span data-rating="${"ratingLevel"}" class="movie-card-rating">${"rating"}</span>
      <div class="movie-card-overview">
        <h2 class="movie-card-overview-heading">Overview</h2>
        <h3 class="movie-card-title">${"title"}</h3>
        <p class="movie-card-description">
          ${"description"}
        </p>
      </div>
    </div>
  </article>    
`(props);
}

function renderMoviesCards(data = [], keyword) {
  moviesContainer.innerHTML = "";

  if (!data.length && keyword) {
    return (moviesContainer.dataset.keyword = keyword);
  }

  moviesContainer.innerHTML = data.reduce((html, movieProps) => {
    return (html += createMovieCardTemplate(movieProps));
  }, "");
}

getMoviesBy("").then(renderMoviesCards);

searchFormEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const keyword = searchInputEl.value.trim();
  getMoviesBy(keyword).then((data) => renderMoviesCards(data, keyword));
});
