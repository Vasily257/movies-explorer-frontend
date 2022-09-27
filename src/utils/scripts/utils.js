import useMediaQuery from '../../hooks/useMediaQuery';

function screenView() {
  const isMobile = useMediaQuery('(min-width: 300px)');
  const isTablet = useMediaQuery('(min-width: 600px)');
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return { isMobile, isTablet, isDesktop };
}

function calcuateMovies() {
  const { isTablet, isDesktop } = screenView();

  let allMoviesCount;
  let savedMoviesCount;
  let addingMovie;

  if (isDesktop) {
    allMoviesCount = 16;
    savedMoviesCount = 3;
    addingMovie = 4;
    return { allMoviesCount, savedMoviesCount, addingMovie };
  }

  if (isTablet) {
    allMoviesCount = 8;
    savedMoviesCount = 2;
    addingMovie = 2;
    return { allMoviesCount, savedMoviesCount, addingMovie };
  }

  allMoviesCount = 5;
  savedMoviesCount = 2;
  addingMovie = 2;

  return { allMoviesCount, savedMoviesCount, addingMovie };
}

export { screenView, calcuateMovies };
