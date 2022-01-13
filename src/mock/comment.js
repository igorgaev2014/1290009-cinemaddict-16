import { generateData, getRandomInteger, generateDate } from '../utils/common.js';
import { commentAuthors, commentDescriptions, EMOTIONS } from '../consts.js';

export const generateComment = () => ({
  id: getRandomInteger(0, 100),
  author: generateData(commentAuthors),
  comment: generateData(commentDescriptions),
  date: generateDate(),
  emotion: generateData(EMOTIONS),
});
