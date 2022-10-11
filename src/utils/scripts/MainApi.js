import { BASE_URL } from './constants';
import { handleResponse } from './utils';

let headers = {
  'Content-Type': 'application/json',
};

function setToken(token) {
  headers = {
    ...headers,
    authorization: `Bearer ${token}`,
  };
}

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

async function getContent(token) {
  setToken(token);
  const response = await fetch(`${BASE_URL.MOVIES_EXPLORER}/users/me`, {
    method: 'GET',
    headers,
  });

  return handleResponse(response);
}

async function updateProfile({ name, email, currentEmail }) {
  const response = await fetch(`${BASE_URL.MOVIES_EXPLORER}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      email,
      currentEmail,
    }),
  });

  return handleResponse(response);
}

export {
  setToken, register, login, getContent, updateProfile,
};
