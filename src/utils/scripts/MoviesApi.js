const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
const headers = {
  'Content-Type': 'application/json',
};

async function getMoviesFromBase() {
  const response = await fetch(`${baseUrl}`, {
    method: 'GET',
    headers,
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error();
}

export default getMoviesFromBase;
