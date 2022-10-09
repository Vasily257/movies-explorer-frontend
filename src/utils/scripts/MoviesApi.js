import { BASE_URL } from './constants';

const headers = {
  'Content-Type': 'application/json',
};

async function getMoviesFromBase() {
  const response = await fetch(`${BASE_URL.BEATFILM_MOVIES}/beatfilm-movies`, {
    method: 'GET',
    headers,
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error();
}

export default getMoviesFromBase;
