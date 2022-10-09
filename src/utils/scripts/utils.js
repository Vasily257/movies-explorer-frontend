import useMediaQuery from '../../hooks/useMediaQuery';

const localMovies = JSON.parse(localStorage.getItem('moviesFromBase')) || [];
const localQuery = localStorage.getItem('query') || '';
const localIsShortsMovies = JSON.parse(localStorage.getItem('isShortsMovies')) || false;

function screenView() {
  const isMobile = useMediaQuery('(min-width: 300px)');
  const isTablet = useMediaQuery('(min-width: 600px)');
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return { isMobile, isTablet, isDesktop };
}

function getRows(columns) {
  let rows = 0;

  if (columns === 1) {
    rows = 5;
  } else {
    rows = 4;
  }

  return rows;
}

function getAddedMovies(columns) {
  let addedMovies = 0;

  if (columns === 1) {
    addedMovies = 2 * columns;
  } else {
    addedMovies = columns;
  }

  return addedMovies;
}

function getHoursAndMinutes(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return { hours, minutes };
}

export {
  localMovies,
  localQuery,
  localIsShortsMovies,
  screenView,
  getRows,
  getAddedMovies,
  getHoursAndMinutes,
};
