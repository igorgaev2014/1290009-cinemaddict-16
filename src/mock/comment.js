import { generateData, getRandomInteger, generateDate } from '../utils.js';
import { commentAuthors, commentDescriptions, commentEmotions } from '../consts.js';

export const generateComment = () => ({
  id: getRandomInteger(0, 100),
  author: generateData(commentAuthors),
  comment: generateData(commentDescriptions),
  date: generateDate(),
  emotion: generateData(commentEmotions),
});
