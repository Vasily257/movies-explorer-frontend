const ERROR_TEXT = {
  MOVIES_NOT_FOUND: 'Ничего не найдено ',
  EMPTY_SEARCH_QUERY: 'Нужно ввести ключевое слово',
  FAILED_FETCH:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};

const inputList = [
  {
    name: 'name',
    type: 'text',
    id: 1,
    value: 'Иван',
    labelText: 'Имя',
    minLength: 2,
    maxLength: 30,
  },
  {
    name: 'email',
    type: 'email',
    id: 2,
    value: 'justamail@mail.ru',
    labelText: 'E-mail',
    minLength: 2,
    maxLength: 30,
  },
  {
    name: 'password',
    type: 'password',
    id: 3,
    value: '12345678',
    labelText: 'Пароль',
    minLength: 2,
    maxLength: 30,
  },
];

export { ERROR_TEXT, inputList };
