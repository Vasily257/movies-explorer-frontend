import { BASE_URL } from './constants';

const localMovies = JSON.parse(localStorage.getItem('moviesFromBase')) || [];
const localQuery = localStorage.getItem('query') || '';
const localIsShortsMovies = JSON.parse(localStorage.getItem('isShortsMovies')) || false;

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(response.status));
}

function validateMovies(movies) {
  return movies.map(
    ({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      id,
    }) => ({
      country,
      director,
      duration,
      year,
      description,
      image: `${BASE_URL.BEATFILM_MOVIES}${image.url}`,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail: `${BASE_URL.BEATFILM_MOVIES}${image.formats.thumbnail.url}`,
      movieId: id,
    }),
  );
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

function filterMovies(moviesList, searchQuery, limitation) {
  const filtredMovies = moviesList.filter(({ nameRU, nameEN, duration }) => (
    [nameRU, nameEN].some((name) => (
      name.includes(searchQuery.toLowerCase()) && duration < limitation
    ))

  ));
  return filtredMovies;
}

export {
  localMovies,
  localQuery,
  localIsShortsMovies,
  handleResponse,
  validateMovies,
  getRows,
  getAddedMovies,
  getHoursAndMinutes,
  filterMovies,
};
