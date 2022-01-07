import FilmBoardView from '../view/film-board-view.js';
import SortView from '../view/sort-view.js';
import FilmListView from '../view/film-list-view.js';
import NoFilmView from '../view/no-film-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPresenter from './film-presenter.js';
import { sortDate, sortRating } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { render, remove } from '../utils/render.js';
import { FILM_COUNT_PER_STEP, RenderPosition, SortType } from '../consts.js';

export default class FilmBoardPresenter {
  #filmBoardContainer = null;

  #filmBoardComponent = new FilmBoardView();
  #sortComponent = new SortView();
  #filmListComponent = new FilmListView();
  #noFilmComponent = new NoFilmView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardFilms = [];

  constructor(filmBoardContainer) {
    this.#filmBoardContainer = filmBoardContainer;
  }

  init = (films) => {
    this.#films = [...films];
    this.#sourcedBoardFilms = [...films];

    render(this.#filmBoardContainer, this.#filmBoardComponent);
    render(this.#filmBoardComponent, this.#filmListComponent);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedBoardFilms = updateItem(this.#sourcedBoardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortRating);
        break;
      default:
        this.#films = [...this.#sourcedBoardFilms];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderFilmList();
  }

  #renderSort = () => {
    render(this.#filmBoardComponent, this.#sortComponent, RenderPosition.BEFORE_BEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListComponent, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #renderNoFilms = () => {
    render(this.#filmBoardComponent, this.#noFilmComponent);
  }

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #renderShowMoreButton = () => {
    render(this.#filmBoardComponent, this.#showMoreButtonComponent);

    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  }

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

  #renderFilmList = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderBoard = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    this.#renderFilmList();
  }
}
