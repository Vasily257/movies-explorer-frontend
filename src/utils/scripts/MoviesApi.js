const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
const headers = {
  'Content-Type': 'application/json',
};

async function getMoviesFromBase() {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'GET',
      headers,
    });

    const movies = await response.json();

    return movies;
  } catch (error) {
    throw new Error('Список фильмов из "beatfilm-movies" не получен.');
  }
}

export default getMoviesFromBase;
