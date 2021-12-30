import AbstractView from './abstract-view.js';

export const createFilmCountTemplate = () => (
  '<p>130 291 movies inside</p>'
);

export default class FilmCountView extends AbstractView {
  get template() {
    return createFilmCountTemplate();
  }
}
