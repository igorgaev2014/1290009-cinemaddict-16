const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.userDetails.isinWatchList).length,
  history: (films) => films.filter((film) => film.userDetails.isAlreadyWatched).length,
  favorites: (films) => films.filter((film) => film.userDetails.isFavorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  })
);
