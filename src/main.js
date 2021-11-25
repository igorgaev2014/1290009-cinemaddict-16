import { createProfileRatingTemplate } from './view/profile-rating-view.js';
import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createSortMenuTemplate } from './view/sort-menu-view.js';
import { createFilmsTemplate } from './view/films-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createShowMoreButtonTemplate } from './view/show-more-button-view.js';
import { createFilmsCountTemplate } from './view/films-count-view.js';
import { createPopupTemplate } from './view/popup-view.js';
import { renderTemplate, RenderPosition } from './render.js';

const TASK_COUNT = 5;
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatsElement = siteFooterElement.querySelector('.footer__statistics');

renderTemplate(siteHeaderElement, createProfileRatingTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterStatsElement, createFilmsCountTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterElement, createPopupTemplate(), RenderPosition.AFTEREND);

const filmsElement = document.querySelector('.films');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(filmsListContainerElement, createShowMoreButtonTemplate(), RenderPosition.AFTEREND);
