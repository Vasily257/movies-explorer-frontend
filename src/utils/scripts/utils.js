import validator from 'validator';
import { BASE_URL } from './constants';

const localMovies = JSON.parse(localStorage.getItem('moviesFromBeatfilm')) || [];
const localQuery = localStorage.getItem('query') || '';
const localIsShortsMovies = JSON.parse(localStorage.getItem('isShortsMovies')) || false;

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(response.status));
}

function bringMoviesToSingleView(movies) {
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

function validateString(string) {
  if (typeof string === 'string' || string instanceof String) return string;
  return 'значение не является строкой';
}

function validateNumber(number) {
  if (typeof number === 'number' || number instanceof Number) return number;
  return NaN;
}

function validateURL(url) {
  if (validator.isURL(validateString(url))) return url;
  return 'https://www.google.com/';
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
      thumbnail,
      movieId,
    }) => ({
      country: validateString(country),
      director: validateString(director),
      duration: validateNumber(duration),
      year: validateString(year),
      description: validateString(description),
      image: validateURL(image),
      trailerLink: validateURL(trailerLink),
      nameRU: validateString(nameRU),
      nameEN: validateString(nameEN),
      thumbnail: validateURL(thumbnail),
      movieId: validateNumber(movieId),
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
      name.toLowerCase().includes(searchQuery.toLowerCase()) && duration < limitation))
  ));
  return filtredMovies;
}

export {
  localMovies,
  localQuery,
  localIsShortsMovies,
  handleResponse,
  bringMoviesToSingleView,
  validateMovies,
  getRows,
  getAddedMovies,
  getHoursAndMinutes,
  filterMovies,
};
