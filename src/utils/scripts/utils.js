const viewportWidth = document.documentElement.clientWidth;

function calcuateMovies() {
  let allMoviesCount;
  let savedMoviesCount;
  let addingMovie;

  if (viewportWidth < 600) {
    allMoviesCount = 5;
    savedMoviesCount = 2;
    addingMovie = 2;
    return { allMoviesCount, savedMoviesCount, addingMovie };
  }

  if (viewportWidth < 900) {
    allMoviesCount = 8;
    savedMoviesCount = 2;
    addingMovie = 2;
    return { allMoviesCount, savedMoviesCount, addingMovie };
  }

  allMoviesCount = 16;
  savedMoviesCount = 3;
  addingMovie = 4;

  return { allMoviesCount, savedMoviesCount, addingMovie };
}

export default calcuateMovies;
