import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import UserForm from '../../components/UserForm/UserForm';

import { INPUT_LIST, STATUS, USER_ERROR_TEXT } from '../../utils/scripts/constants';
import { register } from '../../utils/scripts/MainApi';

function Register() {
  const [errorText, setErrorText] = useState('');
  const registerInputList = INPUT_LIST.map(
    (inputElement) => (inputElement.name === 'name' || 'email' || 'password') && inputElement,
  );

  const onRegister = async ({ name, email, password }) => {
    try {
      const userData = await register({ name, email, password });
      if (userData) {
        <Navigate to="/movies" />;
        setErrorText('');
      }
    } catch (error) {
      switch (+error.message) {
        case STATUS.CONFLICT:
          setErrorText(USER_ERROR_TEXT.ALREADY_EXISTING);
          break;
        default:
          setErrorText(USER_ERROR_TEXT.REGISTRATION_FAILED);
          break;
      }
    }
  };

  return (
    <>
      <Header isEmptyHeader />
      <Content>
        <UserForm
          title="Добро пожаловать!"
          formName="signup"
          inputList={registerInputList}
          apiErrorText={errorText}
          onSubmitForm={onRegister}
          submitButtonText="Зарегистрироваться"
          redirectText="Уже зарегистрированы?"
          redirectPath="/signin"
          redirectLinkText="Войти"
        />
      </Content>
    </>
  );
}

export default Register;
