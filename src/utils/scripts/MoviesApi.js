import { BASE_URL } from './constants';
import { handleResponse } from './utils';

const headers = {
  'Content-Type': 'application/json',
};

async function getMoviesFromBase() {
  const response = await fetch(`${BASE_URL.BEATFILM_MOVIES}/beatfilm-movies`, {
    method: 'GET',
    headers,
  });

  return handleResponse(response);
}

export default getMoviesFromBase;
