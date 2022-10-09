const ERROR_TEXT = {
  MOVIES_NOT_FOUND: 'Ничего не найдено ',
  EMPTY_SEARCH_QUERY: 'Нужно ввести ключевое слово',
  FAILED_FETCH:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};

const BASE_URL = {
  BEATFILM_MOVIES: 'https://api.nomoreparties.co',
  MOVIES_EXPLORER: 'http://api.kalmykov.moviesexplorer.nomoredomains.sbs',
};

const inputList = [
  {
    name: 'name',
    type: 'text',
    id: 1,
    value: '',
    labelText: 'Имя',
    minLength: 2,
    maxLength: 30,
  },
  {
    name: 'email',
    type: 'email',
    id: 2,
    value: '',
    labelText: 'E-mail',
    minLength: 2,
    maxLength: 30,
  },
  {
    name: 'password',
    type: 'password',
    id: 3,
    value: '',
    labelText: 'Пароль',
    minLength: 2,
    maxLength: 30,
  },
];

export { ERROR_TEXT, BASE_URL, inputList };
