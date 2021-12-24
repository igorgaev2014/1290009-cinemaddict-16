import { createElement } from '../render.js';

export const createFilmCountTemplate = () => (
  '<p>130 291 movies inside</p>'
);

export default class FilmCountView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmCountTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
