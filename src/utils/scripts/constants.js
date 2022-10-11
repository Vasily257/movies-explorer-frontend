const STATUS = {
  // CREATED: 201,
  // BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  // FORBIDDEN: 403,
  // NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const USER_ERROR_TEXT = {
  INCORRECT_LOGIN_DATA: 'Вы ввели неправильный логин или пароль.',
  REGISTRATION_FAILED: 'При регистрации пользователя произошла ошибка.',
  PROFILE_UPDATING_FAILED: 'При обновлении профиля произошла ошибка.',
  MISSING_TOKEN: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  INCORRECT_TOKEN: 'При авторизации произошла ошибка. Переданный токен некорректен.',
  ALREADY_EXISTING: 'Пользователь с таким email уже существует.',
};

const SUCCESSFUL_UPDATE_TEXT = 'Профиль успешно обновлен.';

const MOVIES_ERROR_TEXT = {
  EMPTY_QUERY: 'Нужно ввести ключевое слово',
  FETCH_FAILED:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  NOT_FOUND: 'Ничего не найдено ',
};

const COMMON_ERROR_TEXT = {
  PAGE_NOT_FOUND: 'Страница по указанному маршруту не найдена.',
  INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка.',
};

const BASE_URL = {
  BEATFILM_MOVIES: 'https://api.nomoreparties.co',
  MOVIES_EXPLORER: 'https://api.kalmykov.moviesexplorer.nomoredomains.sbs',
};

const INPUT_LIST = [
  {
    name: 'name',
    type: 'text',
    id: 1,
    labelText: 'Имя',
    minLength: null,
    maxLength: null,
  },
  {
    name: 'email',
    type: 'email',
    id: 2,
    labelText: 'E-mail',
    minLength: 2,
    maxLength: 30,
  },
  {
    name: 'password',
    type: 'password',
    id: 3,
    labelText: 'Пароль',
    minLength: 2,
    maxLength: 30,
  },
];

const NAME_REGEX = '([A-Za-z /-]{2,30})|([А-ЯЁа-яё /-]{2,30})';

export {
  STATUS,
  USER_ERROR_TEXT,
  SUCCESSFUL_UPDATE_TEXT,
  MOVIES_ERROR_TEXT,
  COMMON_ERROR_TEXT,
  BASE_URL,
  INPUT_LIST,
  NAME_REGEX,
};
