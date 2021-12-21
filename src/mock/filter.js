const movieToFilterMap = {
  watchlist: (movies) => movies.filter((movie) => movie.userDetails.isinWatchList).length,
  history: (movies) => movies.filter((movie) => movie.userDetails.isAlreadyWatched).length,
  favorites: (movies) => movies.filter((movie) => movie.userDetails.isFavorite).length,
};

export const generateFilter = (movies) => Object.entries(movieToFilterMap).map(
  ([filterName, countMovies]) => ({
    name: filterName,
    count: countMovies(movies),
  })
);
