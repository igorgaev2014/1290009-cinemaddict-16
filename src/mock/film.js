import { getRandomInteger, generateData, generateDate } from '../utils/common.js';
import { titles, posters, descriptions, alternativeTitles, directors, writers, actors, countries, runtimes, genres, watchingDates } from '../consts.js';
import { comments } from '../main.js';
import { nanoid } from 'nanoid';

export const generateFilm = () => ({
  id: nanoid(),
  comments: [...comments],
  title: generateData(titles),
  alternativeTitle: generateData(alternativeTitles),
  totalRating: getRandomInteger(0, 10),
  poster: generateData(posters),
  ageRating: getRandomInteger(0, 10),
  director: generateData(directors),
  writers: generateData(writers),
  actors: generateData(actors),
  release: {
    date: generateDate(),
    releaseCountry: generateData(countries),
  },
  runtime: generateData(runtimes),
  genre: generateData(genres),
  description: generateData(descriptions),
  userDetails: {
    isInWatchList: Boolean(getRandomInteger(0, 1)),
    isAlreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: generateData(watchingDates),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  }
});
