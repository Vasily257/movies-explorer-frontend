import React from 'react';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import UserForm from '../../components/UserForm/UserForm';

import inputList from '../../utils/scripts/constants';

function Login() {
  const loginInputList = inputList.filter(({ name }) => name === 'email' || name === 'password');

  return (
    <>
      <Header isEmptyHeader />
      <Content>
        <UserForm
          title="Рады видеть!"
          formName="signin"
          inputList={loginInputList}
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
