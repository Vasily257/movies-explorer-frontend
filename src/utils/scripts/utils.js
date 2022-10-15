const localMovies = JSON.parse(localStorage.getItem('moviesFromBase')) || [];
const localQuery = localStorage.getItem('query') || '';
const localIsShortsMovies = JSON.parse(localStorage.getItem('isShortsMovies')) || false;

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(response.status));
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
  handleResponse,
  getRows,
  getAddedMovies,
  getHoursAndMinutes,
};
