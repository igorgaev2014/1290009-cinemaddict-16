import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createFilmCardTemplate = (film) => {
  const {title, totalRating, genre, release, poster, description, runtime, userDetails} = film;
  const {isInWatchList, isAlreadyWatched, isFavorite} = userDetails;
  const date = dayjs(release.date).year();

  const inWatchListClassName = isInWatchList
    ? 'film-card__controls-item--active film-card__controls-item--add-to-watchlist'
    : 'film-card__controls-item--add-to-watchlist';

  const watchedClassName = isAlreadyWatched
    ? 'film-card__controls-item--active film-card__controls-item--mark-as-watched'
    : 'film-card__controls-item--mark-as-watched';

  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--active film-card__controls-item--favorite'
    : 'film-card__controls-item--favorite';

  return (
    `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img
        src="./images/posters/${poster}"
        alt=""
        class="film-card__poster"
      >
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">0 comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item ${inWatchListClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setOpenClickHandler = (callback) => {
    this._callback.openClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#openClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  #openClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openClick();
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}

