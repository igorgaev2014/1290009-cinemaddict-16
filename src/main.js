import ProfileRatingView from './view/profile-rating-view.js';
import NavigationView from './view/navigation-view.js';
import FilmCountView from './view/film-count-view.js';

import { render } from './utils/render.js';
import { FILM_COUNT, COMMENT_COUNT } from './consts.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { generateComment } from './mock/comment.js';
import FilmBoardPresenter from './presenter/film-board-presenter.js';

export const comments = Array.from({length: COMMENT_COUNT}, generateComment);
const films = Array.from({length: FILM_COUNT}, generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatsElement = siteFooterElement.querySelector('.footer__statistics');

const filmBoardPresenter = new FilmBoardPresenter(siteMainElement);

render(siteHeaderElement, new ProfileRatingView());
render(siteMainElement, new NavigationView(filters));
render(siteFooterStatsElement, new FilmCountView());

filmBoardPresenter.init(films);
