import ProfileRatingView from './view/profile-rating-view.js';
import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmListView from './view/film-list-view.js';
import NoFilmView from './view/no-film-view.js';
import FilmCardView from './view/film-card-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import FilmCountView from './view/film-count-view.js';
import PopupView from './view/popup-view.js';

import { render } from './render.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP, COMMENT_COUNT, RenderPosition } from './consts.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { generateComment } from './mock/comment.js';

export const comments = Array.from({length: COMMENT_COUNT}, generateComment);
const films = Array.from({length: FILM_COUNT}, generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatsElement = siteFooterElement.querySelector('.footer__statistics');

const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const popupComponent = new PopupView(film);

  const openPopup = () => {
    filmListElement.appendChild(popupComponent.element);
    document.body.classList.add('hide-overflow');
  };

  const closePopup = () => {
    filmListElement.removeChild(popupComponent.element);
    document.body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    openPopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    closePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(filmListElement, filmCardComponent.element);
};

const filmListComponent = new FilmListView();

render(siteHeaderElement, new ProfileRatingView().element);
render(siteMainElement, new NavigationView(filters).element);

if (films.length === 0) {
  render(siteMainElement, new NoFilmView().element);
} else {
  render(siteMainElement, new SortView().element);
}

render(siteMainElement, filmListComponent.element);
render(siteFooterStatsElement, new FilmCountView().element);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmListComponent.element, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmListComponent.element, showMoreButtonComponent.element, RenderPosition.AFTER_END);

  showMoreButtonComponent.element.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListComponent.element, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.element.remove();
      showMoreButtonComponent.removeElement();
    }
  });
}
