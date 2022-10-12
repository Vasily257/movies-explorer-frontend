import React, { useState, useContext } from 'react';

import LoginContext from '../../contexts/LoginContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import UserForm from '../../components/UserForm/UserForm';

import { INPUT_LIST, STATUS, USER_ERROR_TEXT } from '../../utils/scripts/constants';
import { login, setToken, getUserData } from '../../utils/scripts/MainApi';

function Login() {
  const [errorText, setErrorText] = useState('');
  const { setIsLoggedIn } = useContext(LoginContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const loginInputList = INPUT_LIST.filter(({ name }) => name === 'email' || name === 'password');

  const onLogin = async ({ email, password }) => {
    try {
      const token = await login({ email, password });
      if (token.token) {
        localStorage.setItem('token', token.token);
        setToken(token.token);

        const userData = await getUserData(token.token);
        setCurrentUser({ name: userData.name, email: userData.email });

        setIsLoggedIn(true);
        setErrorText('');
      } else {
        setErrorText(USER_ERROR_TEXT.INCORRECT_TOKEN);
      }
    } catch (error) {
      switch (+error.message) {
        case STATUS.UNAUTHORIZED:
          setErrorText(USER_ERROR_TEXT.INCORRECT_LOGIN_DATA);
          break;
        default:
          setErrorText(USER_ERROR_TEXT.MISSING_TOKEN);
          break;
      }
    }
  };

  return (
    <>
      <Header isEmptyHeader />
      <Content>
        <UserForm
          title="Рады видеть!"
          formName="signin"
          inputList={loginInputList}
          apiErrorText={errorText}
          onSubmitForm={onLogin}
          submitButtonText="Войти"
          redirectText="Ещё не зарегистрированы?"
          redirectPath="/signup"
          redirectLinkText="Регистрация"
        />
      </Content>
    </>
  );
}

export default Login;
