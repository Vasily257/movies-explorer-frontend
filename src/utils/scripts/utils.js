const viewportWidth = document.documentElement.clientWidth;

function calcuateAllMovies() {
  let moviesCount;
  let addingMovie;

  if (viewportWidth < 600) {
    moviesCount = 5;
    addingMovie = 2;
    return { moviesCount, addingMovie };
  }

  if (viewportWidth < 900) {
    moviesCount = 8;
    addingMovie = 2;
    return { moviesCount, addingMovie };
  }

  moviesCount = 16;
  addingMovie = 4;

  return { moviesCount, addingMovie };
}

function calcuateSavedMovies() {
  let moviesCount;

  if (viewportWidth < 900) {
    moviesCount = 2;
    return moviesCount;
  }

  moviesCount = 3;

  return moviesCount;
}

export { calcuateAllMovies, calcuateSavedMovies };
