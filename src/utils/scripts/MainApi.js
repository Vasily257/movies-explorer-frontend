import { BASE_URL } from './constants';
import { handleResponse } from './utils';

const headers = {
  'Content-Type': 'application/json',
};

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL.MOVIES_EXPLORER}/signup/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  return handleResponse(response);
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL.MOVIES_EXPLORER}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return handleResponse(response);
}
export { register, login };
