import dayjs from 'dayjs';
import SmartView from './smart-view.js';
import { DateFormat } from '../consts.js';
import { EMOTIONS } from '../consts.js';

const createCommentItemTemplate = ({author, comment, date, emotion}) => {
  const commentDate = dayjs(date).format(DateFormat.LONG);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createEmotionListTemplate = () => (
  EMOTIONS.map((emotion) => `<input
    class="film-details__emoji-item visually-hidden"
    name="comment-emoji"
    type="radio"
    id="emoji-${emotion}"
    value="${emotion}">
  <label
    class="film-details__emoji-label"
    for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png"
      width="30" height="30" alt="emoji">
  </label>`).join('')
);

const createEmotionIconTemplate = (emotion) => (
  `<img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji-${emotion}">`
);

const createNewComment = (emotion, comment) => {
  const emotionIcon = emotion ? createEmotionIconTemplate(emotion) : '';
  const newComment = comment ? comment : '';

  return `<div class="film-details__add-emoji-label">${emotionIcon}</div>
    <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment}</textarea>
    </label>`;
};

const createPopupTemplate = (film) => {
  const {title, alternativeTitle, totalRating, director, actors, ageRating, writers, description, poster, release, runtime, userDetails, genre, comments, commentEmotion, commentInput } = film;

  const {isInWatchList, isAlreadyWatched, isFavorite} = userDetails;

  const releaseDate = dayjs(release.date).format(DateFormat.MEDIUM);

  const watchedClassName = isAlreadyWatched
    ? 'film-details__control-button--active film-details__control-button--watched'
    : 'film-details__control-button--watched';

  const inWatchListClassName = isInWatchList
    ? 'film-details__control-button--active film-details__control-button--watchlist'
    : 'film-details__control-button--watchlist';

  const favoriteClassName = isFavorite
    ? 'film-details__control-button--active film-details__control-button--favorite'
    : 'film-details__control-button--favorite';

  const commentListTemplate = comments
    .map(createCommentItemTemplate)
    .join('');

  const emotionListTemplate = createEmotionListTemplate();
  const newCommentTemplate = createNewComment(commentEmotion, commentInput);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${release.releaseCountry}</td></td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genre}</span>
                  <span class="film-details__genre">${genre}</span>
                  <span class="film-details__genre">${genre}</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${inWatchListClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${watchedClassName}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentListTemplate}
          </ul>

          <div class="film-details__new-comment">
            ${newCommentTemplate}

            <div class="film-details__emoji-list">
              ${emotionListTemplate}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class PopupView extends SmartView {
  constructor(film) {
    super();
    this._data = PopupView.parseFilmToData(film);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._data);
  }

  reset = (film) => {
    this.updateData(
      PopupView.parseFilmToData(film),
    );
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick(PopupView.parseFilmToData(this._data));
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiClickHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#descriptionInputHandler);
    this.element
      .addEventListener('scroll', this.#scrollHandler);
  }

  #emojiClickHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      evt.target.checked = true;
      this.updateData({
        commentEmotion: evt.target.value,
      });
    }
  }

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      commentInput: evt.target.value,
    }, true);
  }

  #scrollHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      scrollTop: evt.target.scrollTop,
    }, true);
  };

  #setScrollPosition = () => {
    this.element.scrollTop = this._data.scrollTop;
  };

  static parseFilmToData = (film) => ({
    ...film,
    commentEmotion: null,
    commentInput: null,
    scrollTop: 0,
  });

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
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

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.#setScrollPosition();
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }
}
