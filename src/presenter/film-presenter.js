import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import { render, remove, replace } from '../utils/render.js';
import { Mode } from '../consts.js';

export default class FilmPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null;

  #filmComponent = null;
  #popupComponent = null;

  #film = null;
  #mode = Mode.CARD;

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmComponent = new FilmCardView(film);
    this.#popupComponent = new PopupView(film);

    this.#filmComponent.setOpenClickHandler(this.#handleOpenClick);
    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setCloseClickHandler(this.#handleCloseClick);
    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmComponent === null) {
      render(this.#filmListContainer, this.#filmComponent);
      return;
    }

    if (this.#mode === Mode.CARD) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.CARD) {
      this.#closePopup();
    }
  }

  #openPopup = () => {
    render(this.#filmListContainer, this.#popupComponent);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.POPUP;
  };

  #closePopup = () => {
    remove(this.#popupComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.CARD;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  }

  #handleOpenClick = () => {
    this.#openPopup();
  }

  #handleCloseClick = () => {
    this.#closePopup();
  }

  #handleWatchlistClick = () => {
    this.#changeData({...this.#film, 'userDetails': {...this.#film.userDetails, isInWatchList: !this.#film.userDetails.isInWatchList}});
  }

  #handleWatchedClick = () => {
    this.#changeData({...this.#film, 'userDetails': {...this.#film.userDetails, isAlreadyWatched: !this.#film.userDetails.isAlreadyWatched}});
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#film, 'userDetails': {...this.#film.userDetails, isFavorite: !this.#film.userDetails.isFavorite}});
  }
}
