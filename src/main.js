import { createProfileRatingTemplate } from './view/profile-rating-view.js';
import { createNavigationTemplate } from './view/navigation-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmsTemplate } from './view/films-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createShowMoreButtonTemplate } from './view/show-more-button-view.js';
import { createFilmsCountTemplate } from './view/films-count-view.js';
import { createPopupTemplate } from './view/popup-view.js';
import { render } from './render.js';
import { MOVIE_COUNT, MOVIE_COUNT_PER_STEP, COMMENT_COUNT, RenderPosition } from './consts.js';
import { generateMovie } from './mock/movie.js';
import { generateFilter } from './mock/filter.js';
import { generateComment } from './mock/comment.js';

export const comments = Array.from({length: COMMENT_COUNT}, generateComment);
const movies = Array.from({length: MOVIE_COUNT}, generateMovie);
const filters = generateFilter(movies);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatsElement = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, createProfileRatingTemplate());
render(siteMainElement, createNavigationTemplate(filters));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsTemplate());
render(siteFooterStatsElement, createFilmsCountTemplate());
render(siteFooterElement, createPopupTemplate(movies[0]), RenderPosition.AFTER_END);

const filmsElement = document.querySelector('.films');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(movies.length, MOVIE_COUNT_PER_STEP); i++) {
  render(filmsListContainerElement, createFilmCardTemplate(movies[i]));
}

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderedMovieCount = MOVIE_COUNT_PER_STEP;

  render(filmsListContainerElement, createShowMoreButtonTemplate(), RenderPosition.AFTER_END);

  const showMoreButton = siteMainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => render(filmsListContainerElement, createFilmCardTemplate(movie), RenderPosition.BEFORE_END));

    renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderedMovieCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}
