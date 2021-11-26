import { createProfileRatingTemplate } from './view/profile-rating-view.js';
import { createNavigationTemplate } from './view/navigation-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmsTemplate } from './view/films-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createShowMoreButtonTemplate } from './view/show-more-button-view.js';
import { createFilmsCountTemplate } from './view/films-count-view.js';
import { createPopupTemplate } from './view/popup-view.js';
import { render, RenderPosition } from './render.js';
import { TASK_COUNT } from './consts.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatsElement = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, createProfileRatingTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsTemplate());
render(siteFooterStatsElement, createFilmsCountTemplate());
render(siteFooterElement, createPopupTemplate(), RenderPosition.AFTER_END);

const filmsElement = document.querySelector('.films');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < TASK_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}

render(filmsListContainerElement, createShowMoreButtonTemplate(), RenderPosition.AFTER_END);
