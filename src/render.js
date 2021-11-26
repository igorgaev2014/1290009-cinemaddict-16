import { RenderPosition } from './consts.js';

export const render = (container, template, place = RenderPosition.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};
